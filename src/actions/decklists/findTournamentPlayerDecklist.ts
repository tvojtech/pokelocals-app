'use server';

import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';

import { db } from '@/lib/db';
import { tournamentPlayerDecklists, userProfile } from '@/lib/db/schema';

import { loadTournamentMetadata } from '../tournament';

export async function findTournamentPlayerDecklist(tournamentId: string, playerId: string) {
  const { userId, orgId } = await auth();

  if (!userId) {
    return { error: 'Not authenticated' };
  }

  const tournament = await loadTournamentMetadata(tournamentId);

  if (!tournament) {
    return { error: 'Tournament not found' };
  }

  // only people that have access to the decklist is player itself and/or tournament organizer
  if (userId !== playerId && tournament.organizationId !== orgId) {
    return { error: 'You are not allowed to view this decklist.' };
  }

  const decklists = await db
    .select({
      id: tournamentPlayerDecklists.id,
      playerId: tournamentPlayerDecklists.playerId,
      playerPokemonId: tournamentPlayerDecklists.playerPokemonId,
      tournamentId: tournamentPlayerDecklists.tournamentId,
      decklist: tournamentPlayerDecklists.decklist,
      createdAt: tournamentPlayerDecklists.createdAt,
      updatedAt: tournamentPlayerDecklists.updatedAt,
    })
    .from(tournamentPlayerDecklists)
    .leftJoin(userProfile, eq(tournamentPlayerDecklists.playerId, userProfile.id))
    .where(and(eq(tournamentPlayerDecklists.tournamentId, tournamentId), eq(userProfile.clerkId, playerId)))
    .limit(1)
    .execute();

  return decklists.length > 0 ? decklists[0] : undefined;
}
