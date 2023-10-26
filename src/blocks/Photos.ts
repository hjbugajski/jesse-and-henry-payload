import { Block } from 'payload/types';

const Photos: Block = {
  slug: 'photos',
  labels: {
    singular: 'Photos',
    plural: 'Photos',
  },
  interfaceName: 'PhotosBlock',
  fields: [
    {
      name: 'photos',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      required: true,
    },
  ],
};

export default Photos;
