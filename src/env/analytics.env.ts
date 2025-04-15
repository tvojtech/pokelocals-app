import { createEnv } from '@t3-oss/env-nextjs';
import { type } from 'arktype';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_POSTHOG_KEY: type.string.atLeastLength(1),
    NEXT_PUBLIC_POSTHOG_HOST: type.string.atLeastLength(1),
    NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN: type.string.atLeastLength(1),
  },
  server: {
    ROLLBAR_SERVER_TOKEN: type.string.atLeastLength(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN: process.env.NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN,
    ROLLBAR_SERVER_TOKEN: process.env.ROLLBAR_SERVER_TOKEN,
  },
});
