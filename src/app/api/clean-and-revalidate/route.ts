import { and, eq, lt } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { tournaments } from '@/lib/db/schema';
import { rollbarServer } from '@/rollbar/server';

export async function GET(request: NextRequest) {
  rollbarServer.info('clean-and-revalidate: Start');

  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    rollbarServer.warning('clean-and-revalidate: Unauthorized request.');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  rollbarServer.info('clean-and-revalidate: Cleaning and revalidating tournaments');

  await db
    .delete(tournaments)
    .where(and(eq(tournaments.uploaded, false), lt(tournaments.expiresAt, new Date().toISOString())))
    .execute();

  rollbarServer.info('clean-and-revalidate: Clean tournaments done. Gonna revalidate cache.');

  revalidateTag('tournaments');

  rollbarServer.info('clean-and-revalidate: Done');

  return NextResponse.json({ ok: true });
}
