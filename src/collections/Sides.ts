import { CollectionConfig } from 'payload/types';

import Tags from './Tags';
import { deepMerge } from '../utils/deepMerge';

const Sides: CollectionConfig = deepMerge<CollectionConfig>(Tags, {
  slug: 'sides',
});

export default Sides;
