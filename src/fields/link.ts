import { Field } from 'payload/types';

export const link: Field = {
  type: 'row',
  fields: [
    {
      name: 'type',
      type: 'radio',
      options: [
        {
          label: 'Internal link',
          value: 'reference',
        },
        {
          label: 'External link',
          value: 'external',
        },
      ],
      defaultValue: 'reference',
      admin: {
        layout: 'horizontal',
        width: '50%',
      },
      required: true,
    },
    {
      name: 'newTab',
      label: 'Open in new tab',
      type: 'checkbox',
      admin: {
        width: '50%',
        style: {
          alignSelf: 'flex-end',
        },
      },
    },
    {
      name: 'text',
      type: 'text',
      required: true,
      admin: {
        width: '100%',
      },
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
  ],
};
