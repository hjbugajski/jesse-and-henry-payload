import React from 'react';

export default function CodeCell({ cellData }) {
  const hyphenIndex = Math.floor(cellData?.length / 2);
  const formattedData = `${cellData?.slice(0, hyphenIndex)}-${cellData?.slice(hyphenIndex)}`;

  return <code className="code-cell">{formattedData?.toUpperCase()}</code>;
}
