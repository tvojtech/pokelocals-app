'use server';

import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';

import { db } from '@/lib/db';
import { tournamentPlayerDecklists } from '@/lib/db/schema';

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
    .select()
    .from(tournamentPlayerDecklists)
    .where(
      and(eq(tournamentPlayerDecklists.tournamentId, tournamentId), eq(tournamentPlayerDecklists.playerId, playerId))
    )
    .limit(1)
    .execute();

  return decklists.length > 0 ? decklists[0] : undefined;
}
