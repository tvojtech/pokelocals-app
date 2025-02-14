import { getStore, Store } from '@netlify/blobs';
import type { Config } from '@netlify/functions';

export default async () => {
  const now = new Date();

  const processBlobs = async (store: Store) => {
    const { blobs } = await store.list();
    blobs.map(async blob => {
      const metadata = await store.getMetadata(blob.key);
      if (typeof metadata?.metadata.uploadedAt === 'string') {
        const uploadedAt = new Date(metadata.metadata.uploadedAt);
        const diff = now.getTime() - uploadedAt.getTime();
        const diffDays = diff / (1000 * 3600 * 24);
        if (diffDays > 2) {
          store.delete(blob.key);
        }
      } else {
        store.delete(blob.key);
      }
    });
  };

  await Promise.all([
    processBlobs(getStore('tournaments')),

    // netlify scheduled functions does not support env propsG
    processBlobs(getStore('production:tournaments')),
    processBlobs(getStore('staging:tournaments')),
  ]);
};

export const config: Config = {
  schedule: '@daily',
};
