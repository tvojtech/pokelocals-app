import { createEnv } from '@t3-oss/env-nextjs';
import { type } from 'arktype';

export const env = createEnv({
  server: {
    SUPABASE_DB_URL: type.string.atLeastLength(1),
  },
  runtimeEnv: {
    SUPABASE_DB_URL: process.env.SUPABASE_DB_URL,
  },
});
