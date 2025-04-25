import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { env } from '@/env/env';

import * as schema from './schema';

// for query purposes
const queryClient = postgres(env.SUPABASE_DB_URL, { prepare: false });
export const db = drizzle({ schema, client: queryClient });

// for migrations
export const migrationClient = postgres(env.SUPABASE_DB_URL, { max: 1 });
