import React from 'react';

const RegistryLeaf: React.FC<{ attributes: any; element: any; children?: React.ReactNode }> = ({
  attributes,
  children,
}) => <div {...attributes}>{children}</div>;

export default RegistryLeaf;
