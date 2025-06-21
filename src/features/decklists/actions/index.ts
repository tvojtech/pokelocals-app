'use server';

import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';

import { db } from '@/lib/db';
import { tournaments } from '@/lib/db/schema';

export async function toggleDecklistsAllowed(tournamentId: string, decklistsAllowed: boolean) {
  const { userId, orgId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  await db.update(tournaments).set({ decklistsAllowed }).where(eq(tournaments.id, tournamentId)).execute();
  revalidateTag('tournaments');
  revalidateTag(`tournaments:${tournamentId}`);
  revalidateTag(`tournaments:org_${orgId}`);
}
