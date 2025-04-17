import { createClient } from 'edgedb';
import Redis from 'ioredis';

import { env } from '@/env/env';

export const edgeDbClient = createClient({
  instanceName: env.EDGEDB_INSTANCE_NAME,
  secretKey: env.EDGEDB_SECRET_KEY,
  branch: env.EDGEDB_BRANCH,
});

export const redis = new Redis(`rediss://default:${env.UPSTASH_REDIS_REST_TOKEN}@${env.UPSTASH_REDIS_REST_URL}:6379`);
