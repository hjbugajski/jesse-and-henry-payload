import { Block } from 'payload/types';

import { link } from '../fields';
import { color } from '../fields/color';
import { width } from '../fields/width';

export const Alert: Block = {
  slug: 'alert',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    color,
    link,
    width,
  ],
};
