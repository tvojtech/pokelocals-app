namespace NodeJS {
  interface ProcessEnv {
    DEPLOYMENT: string;
    PLATFORM: string;

    AUTH_SECRET: string;

    AUTH_DISCORD_ID: string;
    AUTH_DISCORD_SECRET: string;

    AUTH_URL: string;

    EDGEDB_INSTANCE_NAME: string;
    EDGEDB_SECRET_KEY: string;
    EDGEDB_BRANCH: string;

    SUPABASE_DATABASE_URL: string;
    SUPABASE_DRIZZLE_KIT_DATABASE_URL: string;

    EMAIL_SERVER: string;
    EMAIL_FROM: string;

    NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY: string;

    NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN: string;
    ROLLBAR_SERVER_TOKEN: string;
  }
}
