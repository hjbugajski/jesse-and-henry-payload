import { Access } from 'payload/config';
import { FieldAccess } from 'payload/types';

import { User } from '../payload-types';

export const isAuthed: Access<any, User> = ({ req: { user } }) => {
  return Boolean(user);
};

export const isAuthedFieldLevel: FieldAccess<any, User> = ({ req: { user } }) => {
  return Boolean(user);
};
