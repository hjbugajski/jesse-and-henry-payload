import { Block } from 'payload/types';

import venue from '../fields/richText/venue';
import { width } from '../fields/width';

const Content: Block = {
  slug: 'content',
  fields: [
    width,
    {
      name: 'content',
      type: 'richText',
      admin: {
        elements: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ol', 'ul', venue],
      },
      required: true,
    },
  ],
};

export default Content;
