import path from 'path';

import { webpackBundler } from '@payloadcms/bundler-webpack';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload/config';

import Guests from './collections/Guests';
import Media from './collections/Media';
import Pages from './collections/Pages';
import Parties from './collections/Parties';
import Relations from './collections/Relations';
import Sides from './collections/Sides';
import Users from './collections/Users';
import Navigation from './globals/Navigation';

const useDataUrlPath = path.resolve(__dirname, 'hooks/useDataUrl');
const mockModulePath = path.resolve(__dirname, 'mocks/emptyObject.ts');

const domains = process.env.DOMAINS?.split(' ') || [];
const whitelist = [process.env.MONGODB_IP, process.env.SERVER_URL, ...domains].filter(Boolean);

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
  editor: lexicalEditor({}),
  collections: [Guests, Media, Pages, Parties, Relations, Sides, Users],
  globals: [Navigation],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: whitelist,
  csrf: whitelist,
  serverURL: process.env.SERVER_URL,
});
