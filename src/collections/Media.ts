import path from 'path';

import { CollectionConfig } from 'payload/types';

import { hasRole, Role } from '../access';
import useDataUrl from '../hooks/useDataUrl';

const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'createdAt', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: hasRole(Role.Admin),
    update: hasRole(Role.Admin),
    delete: hasRole(Role.Admin),
  },
  hooks: {
    beforeChange: [useDataUrl],
  },
  upload: {
    adminThumbnail: 'thumbnail',
    staticDir: path.resolve(__dirname, '../../media'),
    mimeTypes: ['image/*', 'video/*'],
    imageSizes: [
      {
        name: 'preview',
        height: 1000,
      },
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      label: 'Description',
      type: 'text',
      required: true,
    },
    {
      name: 'dataUrl',
      label: 'Data URL',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
};

export default Media;
