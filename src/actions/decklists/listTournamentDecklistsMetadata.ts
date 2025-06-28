'use server';

import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';

import { db } from '@/lib/db';
import { tournamentPlayerDecklists, userProfile } from '@/lib/db/schema';

import { loadTournamentMetadata } from '../tournament/loadTournamentMetadata';

export async function listTournamentDecklistsMetadata(tournamentId: string) {
  const [{ userId, orgId }, tournament] = await Promise.all([auth(), loadTournamentMetadata(tournamentId)]);

  if (!userId) {
    return { error: 'Not authenticated' };
  }

  if (!tournament) {
    return { error: 'Tournament not found' };
  }

  // only people that have access to the decklist is player itself and/or tournament organizer
  if (tournament.organizationId !== orgId) {
    return { error: 'You are not allowed to view this decklist.' };
  }

  return unstable_cache(
    () => {
      return db
        .select({
          id: tournamentPlayerDecklists.id,
          playerId: tournamentPlayerDecklists.playerId,
          clerkId: userProfile.clerkId,
          playerFirstName: userProfile.firstName,
          playerLastName: userProfile.lastName,
          playerPokemonId: tournamentPlayerDecklists.playerPokemonId,
        })
        .from(tournamentPlayerDecklists)
        .innerJoin(userProfile, eq(tournamentPlayerDecklists.playerId, userProfile.id))
        .where(eq(tournamentPlayerDecklists.tournamentId, tournamentId))
        .execute();
    },
    [tournamentId],
    {
      tags: ['decklists', `decklists:${tournamentId}`],
    }
  )();
}
