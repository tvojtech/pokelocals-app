import { GetObjectCommand, PutObjectCommand, S3 } from '@aws-sdk/client-s3';

import { catchError } from '@/app/utils';
import { env } from '@/env/env';

import { BlobStore } from './types';

const s3Client = new S3({
  region: 'auto',
  endpoint: `https://${env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

async function get(bucket: string, key: string) {
  const [error, result] = await catchError(
    s3Client.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      })
    )
  );

  if (error || !result) {
    console.info(`Failed to find object for key ${key} in bucket ${bucket}`, error);
    return undefined;
  }

  const { Body: content, Metadata: metadata = {} } = result;

  if (!content) {
    return undefined;
  }

  return { content: await content.transformToString(), metadata };
}

export function getStore(namespace: string): BlobStore {
  const bucket = env.CLOUDFLARE_R2_BUCKET_NAME;
  return {
    async get(key) {
      return get(bucket, namespace + '/' + key);
    },
    async getJSON(key) {
      const value = await get(bucket, namespace + '/' + key);
      if (!value) {
        return undefined;
      }
      return { content: JSON.parse(value.content), metadata: value.metadata };
    },
    async set(key, data, options) {
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: namespace + '/' + key,
        Body: data,
        Metadata: {
          ...(options?.metadata ?? {}),
        },
      });

      await s3Client.send(command);
    },
    async setJSON(key, data, options) {
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: namespace + '/' + key,
        Body: JSON.stringify(data),
        ContentType: 'application/json',
        Metadata: {
          ...(options?.metadata ?? {}),
        },
      });

      await s3Client.send(command);
    },
    async list() {
      const { Contents: contents = [] } = await s3Client.listObjects({
        Bucket: bucket,
        Prefix: namespace + '/',
      });

      return contents
        .filter(content => !!content.Key)
        .map(content => content.Key?.replace(namespace + '/', '')) as string[];
    },
  };
}
