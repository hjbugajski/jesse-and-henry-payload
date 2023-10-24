import { slateEditor } from '@payloadcms/richtext-slate';
import { Block } from 'payload/types';

import venue from '../fields/richText/venue';
import { width } from '../fields/width';

const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    width,
    {
      name: 'content',
      type: 'richText',
      editor: slateEditor({
        admin: {
          elements: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ol', 'ul', venue],
        },
      }),
      required: true,
    },
  ],
};

export default Content;
