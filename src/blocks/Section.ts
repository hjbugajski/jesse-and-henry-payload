import { Block } from 'payload/types';

import ButtonLink from './ButtonLink';
import Content from './Content';

export const Section: Block = {
  slug: 'section',
  fields: [
    {
      name: 'id',
      label: 'ID',
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
      blocks: [Content, ButtonLink],
    },
  ],
};
