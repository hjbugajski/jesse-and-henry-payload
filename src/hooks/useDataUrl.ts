import path from 'path';

import { CollectionAfterChangeHook } from 'payload/types';
import sharp from 'sharp';

const useDataUrl: CollectionAfterChangeHook = async ({ req: { payload }, operation, doc }) => {
  if (operation === 'create') {
    const filePath = path.resolve(__dirname, `../../media/${doc.filename}`);
    const imageBuffer = await sharp(filePath).resize(50).toBuffer();
    const dataUrl = `data:${doc.mimeType};base64,${imageBuffer.toString('base64')}`;

    payload.update({
      collection: 'media',
      id: doc.id,
      data: {
        dataUrl,
      },
    });
  }

  return doc;
};

export default useDataUrl;
