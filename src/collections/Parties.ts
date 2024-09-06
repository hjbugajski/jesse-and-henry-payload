import { customAlphabet } from 'nanoid';
import { CollectionBeforeValidateHook, CollectionConfig } from 'payload/types';

import Tags from './Tags';
import CodeCell from '../components/CodeCell';
import { Party } from '../payload-types';
import { deepMerge } from '../utils/deepMerge';

const beforeValidateHook: CollectionBeforeValidateHook<Party> = async ({ data, operation, req }) => {
  if (operation !== 'create') {
    return data;
  }

  const nanoid = customAlphabet('1234567890', 6);
  const limit = await req.payload.find({ collection: 'parties' }).then((data) => data.totalDocs);
  const codes = await req.payload
    .find({ collection: 'parties', limit })
    .then((data) => data.docs.map((doc) => doc.code))
    .then((codes) => new Set(codes));
  let code: string;

  do {
    code = nanoid();
  } while (codes.has(code));

  return { ...data, code };
};

const Parties: CollectionConfig = deepMerge<CollectionConfig>(Tags, {
  slug: 'parties',
  admin: {
    defaultColumns: ['value', 'code', 'color', 'sort'],
  },
  hooks: {
    beforeValidate: [beforeValidateHook],
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        components: {
          Cell: CodeCell,
        },
      },
    },
  ],
});

export default Parties;
