import { FieldAccess } from 'payload/types';

import { User } from '../payload-types';

export const isProtectedField: FieldAccess<any, User> = async ({ req: { user }, doc }) =>
  user ? true : !!doc?.protected === false;
