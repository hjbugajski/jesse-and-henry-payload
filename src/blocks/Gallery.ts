import { Block } from 'payload/types';

const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'BlockGallery',
  fields: [
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      required: true,
    },
  ],
};

export default Gallery;
