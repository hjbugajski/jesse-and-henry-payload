import { Block } from 'payload/types';

import { color } from '../fields/color';
import { linkFields } from '../fields/link';

const ButtonLink: Block = {
  slug: 'buttonLink',
  interfaceName: 'BlockButtonLink',
  fields: [...linkFields, color],
};

export default ButtonLink;
