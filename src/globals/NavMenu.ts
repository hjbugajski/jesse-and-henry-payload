import { GlobalConfig } from 'payload/types';

import { isAdmin } from '../access';
import { link } from '../fields';

const NavMenu: GlobalConfig = {
  slug: 'navMenu',
  access: {
    read: () => true,
    update: isAdmin,
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
