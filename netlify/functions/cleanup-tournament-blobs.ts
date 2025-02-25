import { getStore, listStores } from '@netlify/blobs';
import type { Config } from '@netlify/functions';

export default async () => {
  const storesResult = await listStores();
  const promises = storesResult.stores.map(async storeName => {
    const store = getStore(storeName);
    const blobs = await store.list();
    return blobs.blobs.map(blob => {
      return store.delete(blob.key);
    });
  });
  await Promise.all(promises);
};

export const config: Config = {
  schedule: '@hourly',
};
