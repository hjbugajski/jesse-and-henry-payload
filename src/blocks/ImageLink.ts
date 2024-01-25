import { Block } from 'payload/types';

import { linkFields } from '../fields/link';

const ImageLink: Block = {
  slug: 'imageLink',
  interfaceName: 'BlockImageLink',
  fields: [
    ...linkFields,
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
  ],
};

export default ImageLink;
