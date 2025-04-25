import Redis from 'ioredis';

import { env } from '@/env/env';

export const redis = new Redis(`rediss://default:${env.UPSTASH_REDIS_REST_TOKEN}@${env.UPSTASH_REDIS_REST_URL}:6379`);
