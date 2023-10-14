import { CollectionConfig } from 'payload/types';

import Tags from './Tags';
import { deepMerge } from '../utils/deepMerge';

const Relations: CollectionConfig = deepMerge<CollectionConfig>(Tags, {
  slug: 'relations',
});

export default Relations;
