import { Block, Field } from 'payload/types';

import { linkArray } from '../fields';
import { color } from '../fields/color';
import { deepMerge } from '../utils/deepMerge';

const ButtonLinks: Block = {
  slug: 'buttonLinks',
  labels: {
    singular: 'Button Links',
    plural: 'Button Links',
  },
  interfaceName: 'ButtonLinksBlock',
  fields: [deepMerge<Field>({ fields: [color] }, linkArray)],
};

export default ButtonLinks;
