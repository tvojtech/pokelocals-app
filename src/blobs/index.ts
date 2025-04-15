import { exhaustiveMatchingGuard } from '@/app/utils';
import { env } from '@/env/env';

export async function getStore(namespace: string) {
  switch (env.BLOB_STORAGE) {
    case 'local': {
      const { getStore } = await import('./local');
      return getStore(namespace);
    }
    case 'r2': {
      const { getStore } = await import('./r2');
      return getStore(namespace);
    }
    default:
      return exhaustiveMatchingGuard(env.BLOB_STORAGE, 'Invalid blob storage');
  }
}
