import { AccessResult } from 'payload/config';
import { Access, AccessArgs, FieldAccess } from 'payload/types';

import { User } from '../payload-types';

export enum Role {
  Admin = 'admin',
  Public = 'public',
}

const roleAccess = (user: User, roles: Role[]): boolean => roles.some((r) => user?.roles?.includes(r));

export function hasRole(...roles: Role[]): Access {
  return ({ req }) => roleAccess(req.user, roles);
}

export function hasRoleField(...roles: Role[]): FieldAccess {
  return ({ req }) => roleAccess(req.user, roles);
}

export function hasRoleOrSelf(...roles: Role[]): Access {
  return ({ req: { user } }) =>
    roleAccess(user, roles) || {
      id: {
        equals: user?.id,
      },
    };
}

export function hasRoleOrSelfField(...roles: Role[]): FieldAccess {
  return ({ req: { user }, id }) => roleAccess(user, roles) || user?.id === id;
}

const selfOrPartyQuery = (user: any) => ({
  or: [
    {
      and: [
        {
          party: {
            exists: true,
          },
        },
        {
          party: {
            not_equals: null,
          },
        },
        {
          party: {
            equals: user?.party?.id,
          },
        },
      ],
    },
    {
      id: {
        equals: user?.id,
      },
    },
  ],
});

export function hasRoleSelfOrParty(...roles: Role[]): Access {
  return ({ req: { user } }) => roleAccess(user, roles) || selfOrPartyQuery(user);
}

export async function hasRoleSelfPartyOrBeforeDeadline(
  { req: { payload, user } }: AccessArgs,
  ...roles: Role[]
): Promise<AccessResult> {
  const beforeDeadline = await payload
    .findGlobal({ slug: 'config' })
    .then((config) => (config?.rsvpDeadline ? new Date() < new Date(config.rsvpDeadline) : true));

  return roleAccess(user, roles) || (beforeDeadline && selfOrPartyQuery(user));
}

export function hasAuthAndNotProtectedField(): FieldAccess {
  return ({ req: { user }, doc }) => (user ? true : !!doc?.protected === false);
}

export function hasRoleOrPublished(...roles: Role[]): Access {
  return ({ req: { user } }) =>
    roleAccess(user, roles) || {
      _status: {
        equals: 'published',
      },
    };
}
