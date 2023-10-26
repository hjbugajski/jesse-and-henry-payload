import { slateEditor } from '@payloadcms/richtext-slate';
import { Block } from 'payload/types';

import { Alert } from './Alert';
import ButtonLinks from './ButtonLinks';
import Content from './Content';
import Photos from './Photos';
import venue from '../fields/richText/venue';

export const Section: Block = {
  slug: 'section',
  interfaceName: 'SectionBlock',
  fields: [
    {
      name: 'anchorId',
      label: 'Anchor ID',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      editor: slateEditor({
        admin: {
          elements: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ol', 'ul', venue],
        },
      }),
    },
    {
      name: 'border',
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [Alert, ButtonLinks, Content, Photos],
    },
  ],
};
