import { Block } from 'payload/types';

const Faq: Block = {
  slug: 'faq',
  interfaceName: 'BlockFaq',
  labels: {
    singular: 'FAQ',
    plural: 'FAQ',
  },
  fields: [
    {
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
      minRows: 1,
    },
  ],
};

export default Faq;
