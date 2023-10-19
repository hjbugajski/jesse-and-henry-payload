import { CollectionConfig } from 'payload/types';

import { hasRole, hasRoleField, hasRoleOrSelf, hasRoleOrSelfField, Role } from '../access';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
    disableDuplicate: true,
  },
  access: {
    create: hasRole(Role.Admin),
    read: hasRoleOrSelf(Role.Admin),
    update: hasRoleOrSelf(Role.Admin),
    delete: hasRole(Role.Admin),
  },
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: Role.Public,
      required: true,
      access: {
        read: hasRoleOrSelfField(Role.Admin),
        create: hasRoleField(Role.Admin),
        update: hasRoleField(Role.Admin),
      },
      options: [Role.Admin, Role.Public],
    },
  ],
};

export default Users;
