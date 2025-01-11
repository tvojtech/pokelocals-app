import { getStore as getNetlifyBlobStore } from '@netlify/blobs';

import { BlobStore } from '@/blobs/types';

export const getStore = (namespace: string): BlobStore => {
  const store = getNetlifyBlobStore(namespace);

  return {
    get: key => store.get(key),
    getJSON: async <T>(key: string) => {
      const value = await store.get(key);
      if (!value) {
        return undefined;
      }
      return JSON.parse(value) as T;
    },
    setJSON: (key, data, options) => store.setJSON(key, data, options),
  };
};
