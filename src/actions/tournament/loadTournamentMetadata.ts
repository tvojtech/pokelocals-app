'use server';

import { eq } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';

import { db } from '@/lib/db';
import { tournaments } from '@/lib/db/schema';

export async function loadTournamentMetadata(tournamentId: string) {
  const cachedTournament = await unstable_cache(
    async (tournamentId: string) => {
      const tournament = await db
        .select({
          id: tournaments.id,
          name: tournaments.name,
          tomId: tournaments.tomId,
          startDate: tournaments.startDate,
          uploaded: tournaments.uploaded,
          playerCount: tournaments.playerCount,
          organizationId: tournaments.organizationId,
          expiresAt: tournaments.expiresAt,
        })
        .from(tournaments)
        .where(eq(tournaments.id, tournamentId))
        .limit(1)
        .execute();

      if (!tournament.length) {
        return null;
      }

      return tournament[0];
    },
    ['tournaments', tournamentId],
    { tags: ['tournaments', tournamentId], revalidate: 60 * 60 * 6 }
  )(tournamentId);

  if (!cachedTournament) {
    return null;
  }

  if (cachedTournament.expiresAt < new Date().toISOString()) {
    return null;
  }

  return cachedTournament;
}
