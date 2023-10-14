import { Block } from 'payload/types';

import { linkGroup } from '../fields';
import { color } from '../fields/color';

const ButtonLink: Block = {
  slug: 'buttonLink',
  fields: [color, linkGroup],
};

export default ButtonLink;
