/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    guests: Guest;
    pages: Page;
    parties: Party;
    relations: Relation;
    sides: Side;
    users: User;
  };
  globals: {
    navMenu: NavMenu;
  };
}
export interface Guest {
  id: string;
  first?: string;
  middle?: string;
  last?: string;
  party?: string | Party;
  side?: string | Side;
  relation?: string | Relation;
  phone?: string;
  address?: string;
  rsvpWelcomeParty?: 'accept' | 'decline';
  rsvpWedding?: 'accept' | 'decline';
  rsvpBrunch?: 'accept' | 'decline';
  sort?: number;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  salt?: string;
  hash?: string;
  loginAttempts?: number;
  lockUntil?: string;
  password?: string;
}
export interface Party {
  id: string;
  value: string;
  color?: 'green' | 'teal' | 'cyan' | 'blue' | 'violet' | 'purple' | 'plum' | 'pink' | 'red' | 'orange';
  sort?: number;
  code?: string;
  updatedAt: string;
  createdAt: string;
}
export interface Side {
  id: string;
  value: string;
  color?: 'green' | 'teal' | 'cyan' | 'blue' | 'violet' | 'purple' | 'plum' | 'pink' | 'red' | 'orange';
  sort?: number;
  updatedAt: string;
  createdAt: string;
}
export interface Relation {
  id: string;
  value: string;
  color?: 'green' | 'teal' | 'cyan' | 'blue' | 'violet' | 'purple' | 'plum' | 'pink' | 'red' | 'orange';
  sort?: number;
  updatedAt: string;
  createdAt: string;
}
export interface Page {
  id: string;
  name: string;
  slug?: string;
  meta: {
    title: string;
    description: string;
  };
  content: {
    layout?: (
      | {
          width?: 'full' | 'max';
          content: {
            [k: string]: unknown;
          }[];
          id?: string;
          blockName?: string;
          blockType: 'content';
        }
      | {
          titleOne: string;
          titleTwo: string;
          subtitle: string;
          id?: string;
          blockName?: string;
          blockType: 'hero';
        }
      | {
          id: string;
          title: string;
          description?: {
            [k: string]: unknown;
          }[];
          border: 'none' | 'left' | 'right';
          layout?: (
            | {
                width?: 'full' | 'max';
                content: {
                  [k: string]: unknown;
                }[];
                id?: string;
                blockName?: string;
                blockType: 'content';
              }
            | {
                icon?: string;
                color: 'neutral' | 'neutral-variant' | 'primary' | 'secondary' | 'tertiary' | 'danger';
                link: {
                  type: 'reference' | 'external';
                  newTab?: boolean;
                  text: string;
                  reference: string | Page;
                  url: string;
                  icon?: string;
                };
                id?: string;
                blockName?: string;
                blockType: 'buttonLink';
              }
          )[];
          blockName?: string;
          blockType: 'section';
        }
    )[];
  };
  updatedAt: string;
  createdAt: string;
  _status?: 'draft' | 'published';
}
export interface User {
  id: string;
  roles: ('admin' | 'public')[];
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  salt?: string;
  hash?: string;
  loginAttempts?: number;
  lockUntil?: string;
  password?: string;
}
export interface NavMenu {
  id: string;
  links?: {
    link: {
      type: 'reference' | 'external';
      newTab?: boolean;
      text: string;
      reference: string | Page;
      url: string;
      icon?: string;
    };
    id?: string;
  }[];
  updatedAt?: string;
  createdAt?: string;
}
