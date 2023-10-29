import { CollectionBeforeValidateHook, CollectionConfig } from 'payload/types';

import Tags from './Tags';
import CodeCell from '../components/CodeCell';
import { Party } from '../payload-types';
import { deepMerge } from '../utils/deepMerge';

const beforeValidateHook: CollectionBeforeValidateHook<Party> = async ({ data, operation, req }) => {
  if (operation !== 'create') {
    return data;
  }

  const characters = '1234567890';
  const limit = await req.payload.find({ collection: 'parties' }).then((data) => data.totalDocs);
  const existingCodes = (await req.payload.find({ collection: 'parties', limit })).docs.map((doc) => doc.code);

  let code = '';

  do {
    code = Array.from({ length: 6 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
  } while (existingCodes.includes(code));

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
