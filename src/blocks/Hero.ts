import { Block } from 'payload/types';

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'BlockHero',
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
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
  ],
};
