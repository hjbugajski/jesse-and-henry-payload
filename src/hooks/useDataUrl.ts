import path from 'path';

import { CollectionBeforeChangeHook } from 'payload/types';
import sharp from 'sharp';

const useDataUrl: CollectionBeforeChangeHook = async ({ operation, data }) => {
  if ((operation === 'create' || operation === 'update') && data.mimeType.includes('image')) {
    const filePath = path.resolve(__dirname, `../../media/${data.filename}`);
    const imageBuffer = await sharp(filePath).resize(50).toBuffer();
    const dataUrl = `data:${data.mimeType};base64,${imageBuffer.toString('base64')}`;

    return { ...data, dataUrl };
  }

  return data;
};

export default useDataUrl;
