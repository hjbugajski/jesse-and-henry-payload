import { Field } from 'payload/types';

import RowLabel from '../components/RowLabel';

export const linkFields: Field[] = [
  {
    name: 'text',
    type: 'text',
    required: true,
  },
  {
    name: 'icon',
    type: 'text',
  },
  {
    name: 'type',
    type: 'radio',
    admin: {
      layout: 'horizontal',
    },
    required: true,
    defaultValue: 'reference',
    options: [
      {
        label: 'Internal',
        value: 'reference',
      },
      {
        label: 'External',
        value: 'external',
      },
    ],
  },
  {
    name: 'reference',
    label: 'Page',
    type: 'relationship',
    relationTo: 'pages',
    required: true,
    maxDepth: 1,
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'reference',
    },
  },
  {
    name: 'url',
    label: 'External URL',
    type: 'text',
    required: true,
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'external',
    },
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
  interfaceName: 'LinkGroupField',
  fields: linkFields,
};

export const linkArray: Field = {
  name: 'links',
  type: 'array',
  interfaceName: 'LinkArrayField',
  admin: {
    components: {
      RowLabel: RowLabel('text', 'Link'),
    },
  },
  fields: linkFields,
};
