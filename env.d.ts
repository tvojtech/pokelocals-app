namespace NodeJS {
  interface ProcessEnv {
    APP_ENV: string;
    DEPLOYMENT: string;

    AUTH_SECRET: string;

    AUTH_DISCORD_ID: string;
    AUTH_DISCORD_SECRET: string;

    AUTH_URL: string;

    EDGEDB_INSTANCE_NAME: string;
    EDGEDB_SECRET_KEY: string;
    EDGEDB_BRANCH: string;

    EMAIL_SERVER: string;
    EMAIL_FROM: string;
  }
}
