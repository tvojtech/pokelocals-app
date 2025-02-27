import { exhaustiveMatchingGuard } from '@/app/utils';

export async function getStore(namespace: string) {
  switch (process.env.BLOB_STORAGE) {
    case 'local': {
      const { getStore } = await import('./local');
      return getStore(namespace);
    }
    case 'r2': {
      const { getStore } = await import('./r2');
      return getStore(namespace);
    }
    default:
      return exhaustiveMatchingGuard(
        process.env.BLOB_STORAGE,
        'Invalid blob storage'
      );
  }
}
