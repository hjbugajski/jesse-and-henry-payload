import dotenv from 'dotenv';
import {
  CollectionAfterChangeHook,
  CollectionBeforeValidateHook,
  CollectionConfig,
  Field,
  PayloadRequest,
} from 'payload/types';

import { hasRole, hasRoleField, hasRoleSelfOrParty, Role } from '../access';
import GuestList from '../custom/components/GuestList';
import { Guest } from '../payload-types';
import { deepMerge } from '../utils/deepMerge';

// eslint-disable-next-line import/no-named-as-default-member
dotenv.config();

const cleanString = (str: string) => str.toLowerCase().replace(/[^a-zA-Z]/g, '');

const generateRandomEmail = async (req: PayloadRequest, limit: number) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const existingEmails = await req.payload
    .find({ collection: 'guests', limit })
    .then((data) => data.docs.map((doc) => doc.email));

  let newEmail = '';

  do {
    newEmail =
      Array.from({ length: 10 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('') +
      process.env.EMAIL;
  } while (existingEmails.includes(newEmail));

  return newEmail;
};

const beforeValidateHook: CollectionBeforeValidateHook<Guest> = async ({ data, req }) => {
  const { email, first, middle, last, sort } = data;
  const limit = await req.payload.find({ collection: 'guests' }).then((data) => data.totalDocs);
  const newSort = (!sort && sort !== 0) || sort === -1 ? limit : sort;

  let newEmail = email;

  if (first && last) {
    const middleName = middle ? `.${cleanString(middle)}` : '';

    newEmail = `${cleanString(first)}${middleName}.${cleanString(last)}${process.env.EMAIL}`;
  } else {
    newEmail = await generateRandomEmail(req, limit);
  }

  return { ...data, email: newEmail, sort: newSort };
};

const afterChangeHook: CollectionAfterChangeHook<Guest> = async ({ doc, previousDoc, req }) => {
  const prevParty = previousDoc.party
    ? typeof previousDoc.party === 'string'
      ? previousDoc.party
      : previousDoc.party.id
    : null;
  const party = doc.party ? (typeof doc.party === 'string' ? doc.party : doc.party.id) : null;

  if (!party || party === prevParty) {
    return doc;
  }

  const codePromise = req.payload
    .findByID({
      collection: 'parties',
      id: party,
    })
    .then((data) => data.code);
  const tokenPromise = req.payload.forgotPassword({
    collection: 'guests',
    data: {
      email: doc.email,
    },
    disableEmail: true,
    req,
  });
  const [code, token] = await Promise.all([codePromise, tokenPromise]);

  await req.payload.resetPassword({
    collection: 'guests',
    data: {
      password: `${process.env.GUEST_PASSWORD}-${code}`,
      token,
    },
    overrideAccess: true,
    req,
  });

  return doc;
};

const rsvpOptionField: Partial<Field> = {
  type: 'select',
  admin: {
    isClearable: true,
  },
  options: [
    {
      label: 'Accepted',
      value: 'accept',
    },
    {
      label: 'Declined',
      value: 'decline',
    },
  ],
};

const Guests: CollectionConfig = {
  slug: 'guests',
  auth: true,
  admin: {
    useAsTitle: 'first',
    group: 'Guests Collections',
    pagination: {
      defaultLimit: 250,
      limits: [5, 10, 25, 50, 100, 250, 500],
    },
    defaultColumns: [
      'first',
      'last',
      'party',
      'side',
      'relation',
      'email',
      'phone',
      'address',
      'rsvpWelcomeParty',
      'rsvpWedding',
      'rsvpBrunch',
      'sort',
    ],
    components: {
      views: {
        List: GuestList,
      },
    },
    disableDuplicate: true,
  },
  hooks: {
    beforeValidate: [beforeValidateHook],
    afterChange: [afterChangeHook],
  },
  defaultSort: 'sort',
  access: {
    create: hasRole(Role.Admin),
    read: hasRoleSelfOrParty(Role.Admin),
    update: hasRoleSelfOrParty(Role.Admin),
    delete: hasRole(Role.Admin),
  },
  endpoints: [
    {
      path: '/',
      method: 'post',
      handler: async (req, res) => {
        if (!hasRole(Role.Admin)({ req })) {
          return res.status(401).json({
            message: 'Unauthorized',
          });
        }

        return await req.payload
          .create({
            collection: 'guests',
            data: {
              ...req.body,
              password: `${process.env.GUEST_PASSWORD}-party`,
            },
          })
          .then((doc) =>
            res.status(200).json({
              message: 'Guest successfully created.',
              doc,
            })
          )
          .catch((err) => res.status(500).json(err));
      },
    },
    {
      path: '/reorder',
      method: 'patch',
      handler: async (req, res) => {
        if (!hasRole(Role.Admin)({ req })) {
          return res.status(401).json({
            message: 'Unauthorized',
          });
        }

        const reqDocs: Guest[] = req.body.docs ?? [];

        return await Promise.all(
          reqDocs.map((guest: Guest, index: number) =>
            req.payload.update({
              collection: 'guests',
              id: guest.id,
              data: {
                sort: index,
              },
            })
          )
        )
          .then((results) =>
            res.status(200).json({
              message: 'Guests reordered.',
              results,
            })
          )
          .catch((err) => res.status(500).json(err));
      },
    },
  ],
  fields: [
    {
      name: 'email',
      type: 'email',
      access: {
        read: hasRoleField(Role.Admin),
        update: hasRoleField(Role.Admin),
      },
    },
    {
      name: 'first',
      label: 'First Name',
      type: 'text',
    },
    {
      name: 'middle',
      label: 'Middle Name',
      type: 'text',
    },
    {
      name: 'last',
      label: 'Last Name',
      type: 'text',
    },
    {
      name: 'party',
      type: 'relationship',
      relationTo: 'parties',
      access: {
        read: hasRoleField(Role.Admin),
        update: hasRoleField(Role.Admin),
      },
    },
    {
      name: 'side',
      type: 'relationship',
      relationTo: 'sides',
      access: {
        read: hasRoleField(Role.Admin),
        update: hasRoleField(Role.Admin),
      },
    },
    {
      name: 'relation',
      type: 'relationship',
      relationTo: 'relations',
      access: {
        read: hasRoleField(Role.Admin),
        update: hasRoleField(Role.Admin),
      },
    },
    {
      name: 'phone',
      type: 'text',
      access: {
        read: hasRoleField(Role.Admin),
        update: hasRoleField(Role.Admin),
      },
    },
    {
      name: 'address',
      type: 'textarea',
      access: {
        read: hasRoleField(Role.Admin),
        update: hasRoleField(Role.Admin),
      },
    },
    deepMerge<Field>(rsvpOptionField, {
      name: 'rsvpWelcomeParty',
      label: 'RSVP Welcome Party',
    }),
    deepMerge<Field>(rsvpOptionField, {
      name: 'rsvpRehearsalDinner',
      label: 'RSVP Rehearsal Dinner',
    }),
    deepMerge<Field>(rsvpOptionField, {
      name: 'rsvpWeddingDay',
      label: 'RSVP Wedding Day',
    }),
    deepMerge<Field>(rsvpOptionField, {
      name: 'rsvpPoolDay',
      label: 'RSVP Pool Day',
    }),
    {
      name: 'transportationToVenue',
      label: 'Transportation to Venue',
      type: 'select',
      admin: {
        isClearable: true,
      },
      options: [
        {
          label: 'Yes',
          value: 'yes',
        },
        {
          label: 'No',
          value: 'no',
        },
      ],
    },
    {
      name: 'transportationFromVenue',
      label: 'Transportation from Venue',
      type: 'select',
      admin: {
        isClearable: true,
      },
      options: [
        {
          label: 'Yes',
          value: 'yes',
        },
        {
          label: 'No',
          value: 'no',
        },
      ],
    },
    {
      name: 'legalName',
      type: 'text',
    },
    {
      name: 'dateOfBirth',
      label: 'Date of Birth',
      type: 'text',
    },
    {
      name: 'countryOfBirth',
      label: 'Country of Birth',
      type: 'text',
    },
    {
      name: 'allergies',
      type: 'textarea',
    },
    {
      name: 'sort',
      type: 'number',
      admin: {
        position: 'sidebar',
      },
      access: {
        read: hasRoleField(Role.Admin),
        update: hasRoleField(Role.Admin),
      },
      defaultValue: 0,
    },
  ],
};

export default Guests;
