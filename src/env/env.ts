import { createEnv } from '@t3-oss/env-nextjs';
import { type } from 'arktype';

import { env as analyticsEnv } from './analytics.env';
import { env as authEnv } from './auth.env';
import { env as storageEnv } from './storage.env';

export const env = createEnv({
  extends: [analyticsEnv, storageEnv, authEnv],
  server: {
    BLOB_STORAGE: type.enumerated('local', 'r2'),
  },
  client: {
    NEXT_PUBLIC_DEPLOYMENT: type.string.atLeastLength(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_DEPLOYMENT: process.env.NEXT_PUBLIC_DEPLOYMENT,
    BLOB_STORAGE: process.env.BLOB_STORAGE,
  },
});
