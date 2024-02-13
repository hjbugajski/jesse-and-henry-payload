import { Field } from 'payload/types';

import RowLabel from '../components/RowLabel';

export const richTextLinkFields: Field[] = [
  {
    name: 'tempUrl',
    type: 'text',
    admin: {
      condition: (_, siblingData) => siblingData?.linkType === 'custom',
    },
  },
  {
    name: 'anchor',
    type: 'text',
    admin: {
      condition: (_, siblingData) => siblingData?.linkType === 'internal',
    },
  },
  {
    name: 'rel',
    label: 'Rel Attribute',
    type: 'select',
    hasMany: true,
    options: ['noreferrer', 'nofollow'],
    admin: {
      condition: (_, siblingData) => siblingData?.linkType === 'custom',
    },
  },
];

export const linkFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'text',
        type: 'text',
        required: true,
        admin: {
          width: '50%',
        },
      },
      {
        name: 'icon',
        type: 'text',
        admin: {
          width: '50%',
        },
      },
    ],
  },
  {
    name: 'type',
    type: 'radio',
    admin: {
      layout: 'horizontal',
    },
    required: true,
    defaultValue: 'internal',
    options: [
      {
        label: 'Internal',
        value: 'internal',
      },
      {
        label: 'External',
        value: 'external',
      },
    ],
  },
  {
    type: 'row',
    fields: [
      {
        name: 'relationship',
        label: 'Page',
        type: 'relationship',
        relationTo: 'pages',
        required: true,
        maxDepth: 1,
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'internal',
          width: '50%',
        },
      },
      {
        name: 'anchor',
        type: 'text',
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'internal',
          width: '50%',
        },
      },
    ],
  },
  {
    type: 'row',
    fields: [
      {
        name: 'url',
        label: 'External URL',
        type: 'text',
        required: true,
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'external',
          width: '50%',
        },
      },
      {
        name: 'rel',
        label: 'Rel Attribute',
        type: 'select',
        hasMany: true,
        options: ['noreferrer'],
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'external',
          width: '50%',
        },
      },
    ],
  },
  {
    name: 'newTab',
    label: 'Open in new tab',
    type: 'checkbox',
  },
];

export const linkGroup: Field = {
  name: 'link',
  type: 'group',
  interfaceName: 'FieldLinkGroup',
  fields: linkFields,
};

export const linkArray: Field = {
  name: 'links',
  type: 'array',
  interfaceName: 'FieldLinkArray',
  admin: {
    components: {
      RowLabel: RowLabel('text', 'Link'),
    },
  },
  fields: linkFields,
};
