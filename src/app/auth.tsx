// import { EdgeDBAdapter } from '@auth/edgedb-adapter';
// import { edgeDbClient } from '@tournaments-gg/web/app/db';
import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: EdgeDBAdapter(edgeDbClient),
  providers: [
    // Discord({
    //   clientId: process.env.DISCORD_CLIENT_ID!,
    //   clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    // }),
    Discord,
  ],
});
