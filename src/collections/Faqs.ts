import {
  AlignFeature,
  BlocksFeature,
  BoldTextFeature,
  ItalicTextFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughTextFeature,
  SubscriptTextFeature,
  SuperscriptTextFeature,
  UnderlineTextFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical';
import { CollectionConfig } from 'payload/types';

import { hasRole, hasRoleOrPublished, Role } from '../access';
import Alert from '../blocks/Alert';
import ButtonLink from '../blocks/ButtonLink';
import { richTextLinkFields } from '../fields/link';
import useAppendEmptyParagraph from '../hooks/useAppendEmptyParagraph';

const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: {
    singular: 'FAQs',
    plural: 'FAQs',
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  access: {
    create: hasRole(Role.Admin),
    read: hasRoleOrPublished(Role.Admin),
    update: hasRole(Role.Admin),
    delete: hasRole(Role.Admin),
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'richText',
      hooks: {
        beforeValidate: [useAppendEmptyParagraph],
      },
      editor: lexicalEditor({
        features: () => [
          ParagraphFeature(),
          BoldTextFeature(),
          ItalicTextFeature(),
          UnderlineTextFeature(),
          StrikethroughTextFeature(),
          UnorderedListFeature(),
          OrderedListFeature(),
          SuperscriptTextFeature(),
          SubscriptTextFeature(),
          AlignFeature(),
          LinkFeature({ fields: richTextLinkFields }),
          BlocksFeature({
            blocks: [Alert, ButtonLink],
          }),
        ],
      }),
    },
  ],
};

export default Faqs;
