namespace NodeJS {
  interface ProcessEnv {
    DEPLOYMENT: string;
    PLATFORM: string;
    BLOB_STORAGE: 'local' | 'r2';

    AUTH_SECRET: string;

    AUTH_DISCORD_ID: string;
    AUTH_DISCORD_SECRET: string;

    AUTH_URL: string;

    EDGEDB_INSTANCE_NAME: string;
    EDGEDB_SECRET_KEY: string;
    EDGEDB_BRANCH: string;

    EMAIL_SERVER: string;
    EMAIL_FROM: string;

    NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY: string;

    NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN: string;
    ROLLBAR_SERVER_TOKEN: string;

    NEXT_PUBLIC_POSTHOG_KEY: string;
    NEXT_PUBLIC_POSTHOG_HOST: string;

    CLOUDFLARE_R2_BUCKET_NAME: string;
    CLOUDFLARE_R2_ACCOUNT_ID: string;
    CLOUDFLARE_R2_ACCESS_KEY_ID: string;
    CLOUDFLARE_R2_SECRET_ACCESS_KEY: string;
  }
}
