import React from 'react';

const VenueLeaf: React.FC<{ attributes: any; element: any; children?: React.ReactNode }> = ({
  attributes,
  children,
}) => <div {...attributes}>{children}</div>;

export default VenueLeaf;
