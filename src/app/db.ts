import { createClient } from 'edgedb';

import { env } from '@/env/env';

export const edgeDbClient = createClient({
  instanceName: env.EDGEDB_INSTANCE_NAME,
  secretKey: env.EDGEDB_SECRET_KEY,
  branch: env.EDGEDB_BRANCH,
});
