import fs from 'fs';

import { BlobMetadata, BlobStore } from '@/blobs/types';

const get = (namespace: string) => (key: string) => {
  const path = `/tmp/${namespace}/${key}`;

  return new Promise<{ content: string; metadata: BlobMetadata } | undefined>(
    (resolve, reject) => {
      if (!fs.existsSync(path)) {
        resolve(undefined);
        return;
      }
      fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve({ content: data, metadata: {} });
        }
      });
    }
  );
};

const getJSON =
  <T>(namespace: string) =>
  async (key: string) => {
    const data = await get(namespace)(key);
    if (!data) {
      return undefined;
    }
    return { content: JSON.parse(data.content) as T, metadata: data.metadata };
  };

const setJSON = (namespace: string) => (key: string, data: unknown) => {
  const path = `/tmp/${namespace}/${key}`;

  return new Promise<void>((resolve, reject) => {
    fs.mkdirSync(`/tmp/${namespace}`, { recursive: true });
    fs.writeFile(path, JSON.stringify(data), { encoding: 'utf-8' }, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const getStore = (namespace: string): BlobStore => {
  return {
    get: get(namespace),
    getJSON: getJSON(namespace),
    setJSON: setJSON(namespace),
    list: async () => {
      // this is only for local development so I don't care about proper solution
      fs.mkdirSync(`/tmp/${namespace}`, { recursive: true });
      const files = fs.readdirSync(`/tmp/${namespace}`);
      return files.map(file => file.replace(`/tmp/${namespace}/`, ''));
    },
  };
};
