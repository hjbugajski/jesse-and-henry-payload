import { slateEditor } from '@payloadcms/richtext-slate';
import { Block } from 'payload/types';

import { Alert } from './Alert';
import ButtonLink from './ButtonLink';
import Content from './Content';
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
      type: 'select',
      required: true,
      defaultValue: 'none',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [Alert, ButtonLink, Content],
    },
  ],
};
