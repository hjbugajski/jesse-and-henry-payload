import { CollectionConfig } from 'payload/types';

import { isAdmin, isProtectedField } from '../access';
import { Alert } from '../blocks/Alert';
import Content from '../blocks/Content';
import { Hero } from '../blocks/Hero';
import { Section } from '../blocks/Section';
import { useSlug } from '../hooks/useSlug';

const Pages: CollectionConfig = {
  slug: 'pages',
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
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
    {
      name: 'name',
      type: 'text',
      required: true,
      access: {
        read: isProtectedField,
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Meta',
          name: 'meta',
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
          ],
        },
        {
          label: 'Content',
          name: 'content',
          access: {
            read: isProtectedField,
          },
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [Alert, Content, Hero, Section],
            },
          ],
        },
      ],
    },
  ],
};

export default Pages;
