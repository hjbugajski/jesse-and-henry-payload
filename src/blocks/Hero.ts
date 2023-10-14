import { Block } from 'payload/types';

export const Hero: Block = {
  slug: 'hero',
  fields: [
    {
      name: 'titleOne',
      type: 'text',
      required: true,
    },
    {
      name: 'titleTwo',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
    },
  ],
};
