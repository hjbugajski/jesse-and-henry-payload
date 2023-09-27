import { Block } from 'payload/types';

import { link } from '../fields';
import { color } from '../fields/color';

const ButtonLink: Block = {
  slug: 'buttonLink',
  fields: [
    {
      name: 'icon',
      type: 'text',
    },
    color,
    link,
  ],
};

export default ButtonLink;
