import fs from 'fs';

import { BlobStore } from '@/blobs/types';

const get = (namespace: string) => (key: string) => {
  const path = `/tmp/${namespace}/${key}`;

  return new Promise<string | undefined>((resolve, reject) => {
    if (!fs.existsSync(path)) {
      resolve(undefined);
      return;
    }
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getJSON =
  <T>(namespace: string) =>
  async (key: string) => {
    const fileContent = await get(namespace)(key);
    if (!fileContent) {
      return undefined;
    }
    return JSON.parse(fileContent) as T;
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
  };
};
