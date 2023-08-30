import { Block } from 'payload/types';

import { link } from '../fields';

const ButtonLink: Block = {
  slug: 'buttonLink',
  fields: [
    {
      name: 'icon',
      label: 'Icon',
      type: 'text',
    },
    {
      name: 'color',
      label: 'Color',
      type: 'select',
      required: true,
      defaultValue: 'neutral',
      options: [
        {
          label: 'Neutral',
          value: 'neutral',
        },
        {
          label: 'Neutral Variant',
          value: 'neutral-variant',
        },
        {
          label: 'Primary',
          value: 'primary',
        },
        {
          label: 'Secondary',
          value: 'secondary',
        },
        {
          label: 'Tertiary',
          value: 'tertiary',
        },
        {
          label: 'Danger',
          value: 'danger',
        },
      ],
    },
    link,
  ],
};

export default ButtonLink;
