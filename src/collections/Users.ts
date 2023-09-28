import { CollectionConfig } from 'payload/types';

import { isAdmin, isAdminField, isAdminOrSelf, isAdminOrSelfField } from '../access';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
    disableDuplicate: true,
  },
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['public'],
      required: true,
      access: {
        read: isAdminOrSelfField,
        create: isAdminField,
        update: isAdminField,
      },
      options: ['admin', 'public'],
    },
  ],
};

export default Users;
