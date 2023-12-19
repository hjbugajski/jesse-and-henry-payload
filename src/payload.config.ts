import path from 'path';

import { webpackBundler } from '@payloadcms/bundler-webpack';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import { buildConfig } from 'payload/config';

import Guests from './collections/Guests';
import Media from './collections/Media';
import Pages from './collections/Pages';
import Parties from './collections/Parties';
import Relations from './collections/Relations';
import Sides from './collections/Sides';
import Users from './collections/Users';
import Navigation from './globals/Navigation';

const mockModulePath = path.resolve(__dirname, 'mocks/emptyObject.ts');
const useDataUrlPath = path.resolve(__dirname, 'hooks/useDataUrl');
const whitelist = [process.env.SERVER_URL, process.env.DOMAIN, process.env.PAYLOAD_DOMAIN];

export default buildConfig({
  admin: {
    bundler: webpackBundler(),
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          [useDataUrlPath]: mockModulePath,
        },
      },
    }),
    user: Users.slug,
    css: path.resolve(__dirname, 'custom/styles/index.scss'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI,
    connectOptions: {
      user: process.env.MONGODB_USERNAME,
      pass: process.env.MONGODB_PASSWORD,
      dbName: process.env.MONGODB_DATABASE,
    },
  }),
  editor: slateEditor({}),
  collections: [Guests, Media, Pages, Parties, Relations, Sides, Users],
  globals: [Navigation],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: [process.env.MONGODB_IP, ...whitelist].filter(Boolean),
  csrf: whitelist.filter(Boolean),
  serverURL: process.env.SERVER_URL,
});
