import {
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
import { Block, Field } from 'payload/types';

import { color } from '../fields/color';
import { heading } from '../fields/heading';
import { linkGroup, richTextLinkFields } from '../fields/link';
import useAppendEmptyParagraph from '../hooks/useAppendEmptyParagraph';
import { deepMerge } from '../utils/deepMerge';

const Alert: Block = {
  slug: 'alert',
  interfaceName: 'BlockAlert',
  fields: [
    heading,
    {
      name: 'icon',
      type: 'text',
      required: true,
    },
    color,
    {
      name: 'content',
      type: 'richText',
      hooks: {
        beforeValidate: [useAppendEmptyParagraph],
      },
      required: true,
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
          LinkFeature({ fields: richTextLinkFields }),
        ],
      }),
    },
    {
      name: 'action',
      type: 'checkbox',
      defaultValue: false,
    },
    deepMerge<Field>(linkGroup, {
      admin: {
        condition: (_, siblingData) => siblingData.action,
      },
    }),
  ],
};

export default Alert;
