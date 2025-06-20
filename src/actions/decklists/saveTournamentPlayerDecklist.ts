'use server';

import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';
import { v7 as uuid } from 'uuid';

import { getUserProfile } from '@/features/profile/actions';
import { db } from '@/lib/db';
import { tournamentPlayerDecklists } from '@/lib/db/schema';

import { loadTournamentMetadata } from '../tournament';

export async function saveTournamentPlayerDecklist(
  tournamentId: string,
  playerId: string,
  playerPokemonId: string,
  decklist: string,
  decklistId?: string
) {
  const { userId } = await auth();

  if (!userId) {
    return { error: 'Not authenticated' };
  }

  const tournament = await loadTournamentMetadata(tournamentId);

  if (!tournament) {
    return { error: 'Tournament not found' };
  }

  // only people that have access to the decklist is player itself and/or tournament organizer
  if (userId !== playerId) {
    return { error: 'You are not allowed to save this decklist.' };
  }

  if (decklistId) {
    await db
      .update(tournamentPlayerDecklists)
      .set({ decklist, updatedAt: new Date() })
      .where(and(eq(tournamentPlayerDecklists.id, decklistId)))
      .execute();
  } else {
    const userProfile = await getUserProfile();

    if (!userProfile) {
      throw new Error('User profile not found');
    }

    await db
      .insert(tournamentPlayerDecklists)
      .values({
        id: uuid(),
        tournamentId,
        playerId: userProfile.id,
        playerPokemonId,
        decklist,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .execute();
  }

  return { success: true };
}
