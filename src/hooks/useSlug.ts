import { FieldHook } from 'payload/types';

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-');

export const useSlug: FieldHook = ({ operation, siblingData }) => {
  if (operation === 'create') {
    return slugify(siblingData.name);
  }
};

export const useProtectedSlug: FieldHook = ({ operation, siblingData }) => {
  if (operation === 'create') {
    return `protected/${slugify(siblingData.name)}`;
  }
};
