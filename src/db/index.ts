import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from '@/db/schema/schema';

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(process.env.SUPABASE_DATABASE_URL, {
  prepare: false,
});
export const db = drizzle({ client, casing: 'snake_case', schema });

export { schema };
