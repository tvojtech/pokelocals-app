import { and, eq, lt } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { tournaments } from '@/lib/db/schema';

export async function POST(request: NextRequest) {
  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await db
    .delete(tournaments)
    .where(and(eq(tournaments.uploaded, false), lt(tournaments.expiresAt, new Date().toISOString())));
  revalidateTag('tournaments');
  return NextResponse.json({ ok: true });
}
