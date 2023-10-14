import { GlobalConfig } from 'payload/types';

import { hasRole, Role } from '../access';
import { linkArray } from '../fields';

const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: {
    read: () => true,
    update: hasRole(Role.Admin),
  },
  fields: [linkArray],
};

export default Navigation;
