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
import { Guest, Party } from '../payload-types';
import { deepMerge } from '../utils/deepMerge';

// eslint-disable-next-line import/no-named-as-default-member
dotenv.config();

const cleanString = (str: string) => str.toLowerCase().replace(/[^a-zA-Z]/g, '');

const generateRandomEmail = async (req: PayloadRequest, limit: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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

const beforeValidateHook: CollectionBeforeValidateHook<Guest> = async ({ data, operation, req }) => {
  if (operation !== 'create' && operation !== 'update') {
    return data;
  }

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
  const party = doc.party as Party;

  if (!party || party.id === previousDoc.party) {
    return doc;
  }

  const codePromise = req.payload
    .findByID({
      collection: 'parties',
      id: party.id,
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
      name: 'rsvpWedding',
      label: 'RSVP Wedding',
    }),
    deepMerge<Field>(rsvpOptionField, {
      name: 'rsvpBrunch',
      label: 'RSVP Brunch',
    }),
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
