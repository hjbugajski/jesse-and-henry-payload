import { FieldHook } from 'payload/types';

const useAppendEmptyParagraph: FieldHook = ({ value }) => {
  if (value?.root?.children) {
    const lastChild = value.root.children[value.root.children.length - 1];

    if (!lastChild.children || lastChild.children.length > 0) {
      value.root.children.push({
        children: [],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      });
    }
  }

  return value;
};

export default useAppendEmptyParagraph;
