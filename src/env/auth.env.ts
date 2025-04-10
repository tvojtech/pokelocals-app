import { createEnv } from '@t3-oss/env-nextjs';
import { type } from 'arktype';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: type.string.atLeastLength(1),
  },
  server: {
    AUTH_SECRET: type.string.atLeastLength(1),
    BETTER_AUTH_SECRET: type.string.atLeastLength(1),
    AUTH_DISCORD_ID: type.string.atLeastLength(1),
    AUTH_DISCORD_SECRET: type.string.atLeastLength(1),
    AUTH_URL: type.string.atLeastLength(1),

    CLERK_SECRET_KEY: type.string.atLeastLength(1),
  },
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    AUTH_DISCORD_ID: process.env.AUTH_DISCORD_ID,
    AUTH_DISCORD_SECRET: process.env.AUTH_DISCORD_SECRET,
    AUTH_URL: process.env.AUTH_URL,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,

    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
});
