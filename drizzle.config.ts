import type { Config } from 'drizzle-kit';

import { env } from '@/env/env';

export default {
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.POSTGRES_DB_URL,
  },
} satisfies Config;
