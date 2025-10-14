'use server';

import { and, eq, lt } from 'drizzle-orm';
import { updateTag } from 'next/cache';

import { db } from '@/lib/db';
import { tournaments } from '@/lib/db/schema';

export async function deleteObsoleteTournaments() {
  await db
    .delete(tournaments)
    .where(and(eq(tournaments.uploaded, false), lt(tournaments.expiresAt, new Date().toISOString())))
    .execute();

  updateTag('tournaments');
}
