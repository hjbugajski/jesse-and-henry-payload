import { GlobalConfig } from 'payload/types';

import { hasRole, Role } from '../access';
import { link } from '../fields';

const NavMenu: GlobalConfig = {
  slug: 'navMenu',
  access: {
    read: () => true,
    update: hasRole(Role.Admin),
  },
  fields: [
    {
      name: 'links',
      type: 'array',
      fields: [link],
    },
  ],
};

export default NavMenu;
