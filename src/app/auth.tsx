import { EdgeDBAdapter } from '@auth/edgedb-adapter';
import NextAuth from 'next-auth';
import Discord from 'next-auth/providers/discord';

import { edgeDbClient } from '@/app/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: process.env.APP_ENV === 'development',
  adapter: EdgeDBAdapter(edgeDbClient),
  providers: [Discord],
  session: {
    strategy: 'database',
  },
});
