import { NextResponse } from 'next/server';

import { auth } from '@/app/auth';

export const GET = auth(req => {
  const session = req.auth;
  return NextResponse.json({ auth: !!session });

  // https://github.com/nextauthjs/next-auth/issues/12224#issuecomment-2506852177
}) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
