import { Block } from 'payload/types';

export const Hero: Block = {
  slug: 'hero',
  fields: [
    {
      name: 'titleOne',
      type: 'text',
      label: 'Title One',
      required: true,
    },
    {
      name: 'titleTwo',
      type: 'text',
      label: 'Title Two',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      required: true,
    },
  ],
};
