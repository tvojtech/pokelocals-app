import { NextResponse } from 'next/server';

import { auth } from '@/app/auth';

export const GET = auth(function GET(req) {
  const session = req.auth;
  return NextResponse.json({ auth: !!session }, { status: 200 });
});
