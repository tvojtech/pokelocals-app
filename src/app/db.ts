import { createClient } from 'edgedb';

export const edgeDbClient = createClient({
  instanceName: process.env.EDGEDB_INSTANCE_NAME,
  secretKey: process.env.EDGEDB_SECRET_KEY,
  branch: process.env.EDGEDB_BRANCH,
});
