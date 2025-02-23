import { GetObjectCommand, PutObjectCommand, S3 } from '@aws-sdk/client-s3';

import { BlobStore } from './types';

const s3Client = new S3({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

async function get(bucket: string, key: string) {
  const { Body: content, Metadata: metadata = {} } = await s3Client.send(
    new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    })
  );

  if (!content) {
    return undefined;
  }

  return { content: await content.transformToString(), metadata };
}

export function getStore(namespace: string): BlobStore {
  const bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME;
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
