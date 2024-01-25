import { Field, GlobalConfig } from 'payload/types';

import { hasRole, Role } from '../access';
import { color } from '../fields/color';
import { linkArray, linkGroup } from '../fields/link';
import { deepMerge } from '../utils/deepMerge';

const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: {
    read: () => true,
    update: hasRole(Role.Admin),
  },
  fields: [
    linkArray,
    {
      name: 'showCta',
      label: 'Show Call to Action',
      type: 'checkbox',
      defaultValue: false,
    },
    deepMerge<Field>(linkGroup, {
      name: 'callToAction',
      label: 'Call to Action',
      admin: {
        condition: (_, siblingData) => siblingData.showCta,
      },
      fields: [color],
    }),
  ],
};

export default Navigation;
