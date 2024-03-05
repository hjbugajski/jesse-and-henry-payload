import { GlobalConfig } from 'payload/types';

import { hasRole, Role } from '../access';

const Config: GlobalConfig = {
  slug: 'config',
  access: {
    read: () => true,
    update: hasRole(Role.Admin),
  },
  fields: [
    {
      name: 'rsvpDeadline',
      label: 'RSVP Deadline',
      type: 'date',
      required: true,
    },
  ],
};

export default Config;
