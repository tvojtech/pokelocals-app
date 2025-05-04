'use server';

import { unstable_cache } from 'next/cache';

import { Tournament } from '@/actions/tournament/types';
import { redis } from '@/app/db';
import { getStore } from '@/blobs';

import { loadTournamentMetadata } from './loadTournamentMetadata';
import { calculatePlayerScores } from './tournamentUtils';
import { xmlToObject } from './xml';

export async function loadTournament(tournamentId: string) {
  const tournamentMetadata = await loadTournamentMetadata(tournamentId);

  if (!tournamentMetadata) {
    return undefined;
  }

  return _loadTournamentData(tournamentId);
}

async function _loadTournamentData(tournamentId: string): Promise<Tournament | undefined> {
  return unstable_cache(
    async (tournamentId: string) => {
      const redisKey = `tournaments/${tournamentId}`;
      const redisResult = await redis.get(redisKey);

      if (redisResult) {
        return JSON.parse(redisResult);
      }

      const store = await getStore('tournaments');
      const result = await store.list(tournamentId);

      if (!result || result.length === 0) {
        return undefined;
      }

      const sortedResult = result.toSorted((a, b) => a.localeCompare(b));
      const latestResult = await store.get(sortedResult[sortedResult.length - 1]);

      if (!latestResult) {
        return undefined;
      }

      const tournament = calculatePlayerScores(xmlToObject(latestResult.content));

      await redis
        .multi()
        .set(redisKey, JSON.stringify(tournament))
        .expire(redisKey, 60 * 60 * 6)
        .exec();

      return tournament;
    },
    ['tournaments', tournamentId],
    { tags: ['tournaments', tournamentId], revalidate: 60 * 60 * 6 }
  )(tournamentId);
}
