import { Block } from 'payload/types';

const Content: Block = {
  slug: 'content',
  fields: [
    {
      name: 'width',
      type: 'select',
      options: [
        {
          label: 'Full Width',
          value: 'full',
        },
        {
          label: 'Max Width',
          value: 'max',
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
};

export default Content;
