'use server';

import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { updateTag } from 'next/cache';

import { db } from '@/lib/db';
import { tournaments } from '@/lib/db/schema';

export async function toggleDecklistsAllowed(tournamentId: string, decklistsAllowed: boolean) {
  const { userId, orgId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  await db.update(tournaments).set({ decklistsAllowed }).where(eq(tournaments.id, tournamentId)).execute();
  updateTag('tournaments');
  updateTag(`tournaments:${tournamentId}`);
  updateTag(`tournaments:org_${orgId}`);
}
