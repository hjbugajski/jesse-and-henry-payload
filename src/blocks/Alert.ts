import { Block, Field } from 'payload/types';

import { linkGroup } from '../fields';
import { color } from '../fields/color';
import { width } from '../fields/width';
import { deepMerge } from '../utils/deepMerge';

export const Alert: Block = {
  slug: 'alert',
  interfaceName: 'AlertBlock',
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
    {
      name: 'action',
      type: 'checkbox',
      defaultValue: false,
    },
    deepMerge<Field>(linkGroup, {
      admin: {
        condition: (_, siblingData) => siblingData.action,
      },
    }),
    width,
  ],
};
