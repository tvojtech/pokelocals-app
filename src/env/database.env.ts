import { createEnv } from '@t3-oss/env-nextjs';
import { type } from 'arktype';

export const env = createEnv({
  server: {
    POSTGRES_DB_URL: type.string.atLeastLength(1),
  },
  runtimeEnv: {
    POSTGRES_DB_URL: process.env.POSTGRES_DB_URL,
  },
});
