import {
  AlignFeature,
  BlocksFeature,
  BoldTextFeature,
  HeadingFeature,
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

import Alert from './Alert';
import ButtonLink from './ButtonLink';
import Faq from './Faq';
import Gallery from './Gallery';
import ImageLink from './ImageLink';
import { heading } from '../fields/heading';
import { richTextLinkFields } from '../fields/link';
import useAppendEmptyParagraph from '../hooks/useAppendEmptyParagraph';
import { deepMerge } from '../utils/deepMerge';

export const Section: Block = {
  slug: 'section',
  interfaceName: 'BlockSection',
  fields: [
    deepMerge<Field>(heading, { required: false }),
    {
      name: 'border',
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
    {
      name: 'content',
      type: 'richText',
      hooks: {
        beforeValidate: [useAppendEmptyParagraph],
      },
      editor: lexicalEditor({
        features: () => [
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3'] }),
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
            blocks: [Alert, ButtonLink, Faq, Gallery, ImageLink, { slug: 'registry', fields: [] }],
          }),
        ],
      }),
    },
  ],
};
