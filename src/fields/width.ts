import { Field } from 'payload/types';

export const width: Field = {
  name: 'width',
  type: 'select',
  defaultValue: 'full',
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
