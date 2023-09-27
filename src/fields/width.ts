import { Field } from 'payload/types';

export const width: Field = {
  name: 'width',
  type: 'select',
  options: [
    {
      label: 'Full Width',
      value: 'full',
    },
    {
      label: 'Max Width',
      value: 'max',
    },
  ],
};
