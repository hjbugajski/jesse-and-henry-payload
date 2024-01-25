import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { CollectionConfig, FieldHook } from 'payload/types';

import { hasAuthAndNotProtectedField, hasRole, hasRoleOrPublished, Role } from '../access';
import { Hero } from '../blocks/Hero';
import { Section } from '../blocks/Section';
import useAppendEmptyParagraph from '../hooks/useAppendEmptyParagraph';
import { slugify } from '../utils/slugify';

export const useSlug: FieldHook = ({ operation, siblingData }) => {
  if (operation === 'create' || operation === 'update') {
    return slugify(siblingData?.title);
  }
};

const Pages: CollectionConfig = {
  slug: 'pages',
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'protected', 'updatedAt'],
  },
  access: {
    create: hasRole(Role.Admin),
    read: hasRoleOrPublished(Role.Admin),
    update: hasRole(Role.Admin),
    delete: hasRole(Role.Admin),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      access: {
        read: hasAuthAndNotProtectedField(),
      },
      hooks: {
        beforeValidate: [useAppendEmptyParagraph],
      },
      editor: lexicalEditor({
        features: () => [
          BlocksFeature({
            blocks: [Hero, Section],
          }),
        ],
      }),
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      hooks: {
        beforeValidate: [useSlug],
      },
    },
    {
      name: 'protected',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
};

export default Pages;
