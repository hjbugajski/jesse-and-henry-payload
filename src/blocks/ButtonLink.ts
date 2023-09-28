import { Block } from 'payload/types';

import { link } from '../fields';
import { color } from '../fields/color';

const ButtonLink: Block = {
  slug: 'buttonLink',
  fields: [color, link],
};

export default ButtonLink;
