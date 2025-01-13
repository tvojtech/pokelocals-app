import { loadEnvConfig } from '@next/env';
import { defineConfig } from 'drizzle-kit';

loadEnvConfig(process.cwd(), true);

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema/*',

  schemaFilter: 'public',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: process.env.SUPABASE_DRIZZLE_KIT_DATABASE_URL,
  },
});
