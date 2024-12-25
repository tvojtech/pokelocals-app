// import { edgeDbClient } from '@tournaments-gg/web/app/db';
import PostgresAdapter from "@auth/pg-adapter";
import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: process.env.NODE_ENV === "development",
  adapter: PostgresAdapter(pool),
  providers: [
    // Discord({
    //   clientId: process.env.DISCORD_CLIENT_ID!,
    //   clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    // }),
    Discord,
  ],
});
