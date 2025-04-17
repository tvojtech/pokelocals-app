import { createEnv } from '@t3-oss/env-nextjs';
import { type } from 'arktype';

export const env = createEnv({
  client: {},
  server: {
    CLOUDFLARE_R2_BUCKET_NAME: type.string.atLeastLength(1),
    CLOUDFLARE_R2_ACCOUNT_ID: type.string.atLeastLength(1),
    CLOUDFLARE_R2_ACCESS_KEY_ID: type.string.atLeastLength(1),
    CLOUDFLARE_R2_SECRET_ACCESS_KEY: type.string.atLeastLength(1),

    EDGEDB_INSTANCE_NAME: type.string.atLeastLength(1),
    EDGEDB_SECRET_KEY: type.string.atLeastLength(1),
    EDGEDB_BRANCH: type.string.atLeastLength(1),

    UPSTASH_REDIS_REST_URL: type.string.atLeastLength(1),
    UPSTASH_REDIS_REST_TOKEN: type.string.atLeastLength(1),
  },
  runtimeEnv: {
    CLOUDFLARE_R2_BUCKET_NAME: process.env.CLOUDFLARE_R2_BUCKET_NAME,
    CLOUDFLARE_R2_ACCOUNT_ID: process.env.CLOUDFLARE_R2_ACCOUNT_ID,
    CLOUDFLARE_R2_ACCESS_KEY_ID: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    CLOUDFLARE_R2_SECRET_ACCESS_KEY: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,

    EDGEDB_INSTANCE_NAME: process.env.EDGEDB_INSTANCE_NAME,
    EDGEDB_SECRET_KEY: process.env.EDGEDB_SECRET_KEY,
    EDGEDB_BRANCH: process.env.EDGEDB_BRANCH,

    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  },
});
