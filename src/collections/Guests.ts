import dotenv from 'dotenv';
import { BeforeValidateHook } from 'payload/dist/collections/config/types';
import { CollectionConfig, Field } from 'payload/types';

import { isAdmin, isAdminFieldLevel, isAdminOrSelf, isAdminOrSelfFieldLevel } from '../access';
import { Guest } from '../payload-types';

dotenv.config();

const beforeValidateHook: BeforeValidateHook<Guest> = async ({ data, operation, req }) => {
  if (operation === 'create') {
    const { email, sort } = data;
    let newEmail = email;
    let newSort = data.sort;

    if (!email || email === `new${process.env.EMAIL}`) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const existingEmails = await req.payload
        .find({ collection: 'guests' })
        .then((data) => data.docs.map((doc: Guest) => doc.email));

      do {
        let result = '';

        for (let i = 0; i < 10; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        newEmail = result + process.env.EMAIL;
      } while (existingEmails.includes(newEmail));
    }

    if (!sort || sort === 0) {
      const guests = await req.payload.find({ collection: 'guests' }).then((data) => data.docs as Guest[]);

      newSort = guests.length ? guests[0].sort - 1 : 0;
    }

    return { ...data, email: newEmail, sort: newSort };
  }
};

const sanitizeParty = (party: string) => party.toLowerCase().replace(/[^a-zA-Z]/g, '');

const rsvpOptionField: Field = {
  name: 'rsvpOption',
  type: 'select',
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
  admin: {
    isClearable: true,
  },
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
  },
  hooks: {
    beforeValidate: [beforeValidateHook],
  },
  defaultSort: 'sort',
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  endpoints: [
    {
      path: '/',
      method: 'post',
      handler: async (req, res) =>
        await req.payload
          .create({
            collection: 'guests',
            data: {
              ...req.body,
              password: `${process.env.GUEST_PASSWORD}-${sanitizeParty(req.body.party ?? 'party')}`,
            },
          })
          .then((doc) =>
            res.status(200).json({
              message: 'Guest successfully created.',
              doc,
            })
          )
          .catch((err) => res.status(500).json(err)),
    },
  ],
  fields: [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      access: {
        create: isAdminFieldLevel,
        read: isAdminOrSelfFieldLevel,
        update: isAdminFieldLevel,
      },
    },
    {
      name: 'first',
      label: 'First Name',
      type: 'text',
    },
    {
      name: 'last',
      label: 'Last Name',
      type: 'text',
    },
    {
      name: 'party',
      label: 'Party',
      type: 'relationship',
      relationTo: 'parties',
      access: {
        create: isAdminFieldLevel,
        read: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
    },
    {
      name: 'side',
      label: 'Side',
      type: 'relationship',
      relationTo: 'sides',
      access: {
        create: isAdminFieldLevel,
        read: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
    },
    {
      name: 'relation',
      label: 'Relation',
      type: 'relationship',
      relationTo: 'relations',
      access: {
        create: isAdminFieldLevel,
        read: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'text',
      access: {
        create: isAdminFieldLevel,
        read: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
    },
    {
      name: 'address',
      label: 'Address',
      type: 'textarea',
      access: {
        create: isAdminFieldLevel,
        read: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
    },
    {
      ...rsvpOptionField,
      name: 'rsvpWelcomeParty',
      label: 'RSVP Welcome Party',
    },
    {
      ...rsvpOptionField,
      name: 'rsvpWedding',
      label: 'RSVP Wedding',
    },
    {
      ...rsvpOptionField,
      name: 'rsvpBrunch',
      label: 'RSVP Brunch',
    },
    {
      name: 'sort',
      label: 'Sort',
      type: 'number',
      defaultValue: 0,
      access: {
        create: isAdminFieldLevel,
        read: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
    },
  ],
};

export default Guests;