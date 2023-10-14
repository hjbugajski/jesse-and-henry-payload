import { GlobalConfig } from 'payload/types';

import { hasRole, Role } from '../access';
import { linkArray } from '../fields';

const NavMenu: GlobalConfig = {
  slug: 'navMenu',
  access: {
    read: () => true,
    update: hasRole(Role.Admin),
  },
  fields: [linkArray],
};

export default NavMenu;
