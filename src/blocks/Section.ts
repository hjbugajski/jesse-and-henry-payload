import { Block } from 'payload/types';

import { Alert } from './Alert';
import ButtonLink from './ButtonLink';
import Content from './Content';
import venue from '../fields/richText/venue';

export const Section: Block = {
  slug: 'section',
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
      admin: {
        elements: [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'indent',
          'textAlign',
          'ol',
          'ul',
          'blockquote',
          'link',
          'relationship',
          'upload',
          venue,
        ],
      },
    },
    {
      name: 'border',
      type: 'select',
      required: true,
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
      defaultValue: 'none',
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [Alert, ButtonLink, Content],
    },
  ],
};
