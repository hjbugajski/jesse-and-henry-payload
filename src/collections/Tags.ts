import { CollectionConfig } from 'payload/types';

import { hasRole, Role } from '../access';

const Tags: CollectionConfig = {
  slug: 'tags',
  access: {
    create: hasRole(Role.Admin),
    read: hasRole(Role.Admin),
    update: hasRole(Role.Admin),
    delete: hasRole(Role.Admin),
  },
  admin: {
    useAsTitle: 'value',
    group: 'Guests Collections',
    defaultColumns: ['value', 'sort', 'id'],
    disableDuplicate: true,
  },
  defaultSort: 'sort',
  fields: [
    {
      name: 'value',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'color',
      type: 'select',
      admin: {
        isClearable: true,
      },
      options: [
        {
          label: 'Green',
          value: 'green',
        },
        {
          label: 'Teal',
          value: 'teal',
        },
        {
          label: 'Cyan',
          value: 'cyan',
        },
        {
          label: 'Blue',
          value: 'blue',
        },
        {
          label: 'Violet',
          value: 'violet',
        },
        {
          label: 'Purple',
          value: 'purple',
        },
        {
          label: 'Plum',
          value: 'plum',
        },
        {
          label: 'Pink',
          value: 'pink',
        },
        {
          label: 'Red',
          value: 'red',
        },
        {
          label: 'Orange',
          value: 'orange',
        },
      ],
    },
    {
      name: 'sort',
      type: 'number',
      defaultValue: 0,
    },
  ],
};

export default Tags;
