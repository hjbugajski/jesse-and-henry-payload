import { CollectionConfig } from 'payload/types';

import Pages from './Pages';
import { isAuthedFieldLevel } from '../access';
import { Alert } from '../blocks/Alert';
import Content from '../blocks/Content';
import { Hero } from '../blocks/Hero';
import { Section } from '../blocks/Section';
import { useProtectedSlug } from '../hooks/useSlug';

const ProtectedPages: CollectionConfig = {
  ...Pages,
  slug: 'protected-pages',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      access: {
        read: isAuthedFieldLevel,
      },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [useProtectedSlug],
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
              access: {
                read: isAuthedFieldLevel,
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              access: {
                read: isAuthedFieldLevel,
              },
            },
          ],
        },
        {
          label: 'Content',
          name: 'content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [Alert, Content, Hero, Section],
              access: {
                read: isAuthedFieldLevel,
              },
            },
          ],
        },
      ],
    },
  ],
};

export default ProtectedPages;
