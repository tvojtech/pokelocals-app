'use server';

import { unstable_cache } from 'next/cache';

import { TournamentWithUnofficialStandings } from '@/actions/tournament/types';
import { redis } from '@/app/db';
import { getStore } from '@/blobs';

import { loadTournamentMetadata } from './loadTournamentMetadata';
import { calculatePlayerScores, calculateUnofficialStandings } from './tournamentUtils';
import { xmlToObject } from './xml';

export type TournamentWithMetadata = NonNullable<Awaited<ReturnType<typeof loadTournament>>>;

export async function loadTournament(tournamentId: string) {
  const tournamentMetadata = await loadTournamentMetadata(tournamentId);

  if (!tournamentMetadata) {
    return undefined;
  }

  const tournamentData = await _loadTournamentData(tournamentId);

  if (!tournamentData) {
    return undefined;
  }

  return { ...tournamentData, __metadata: tournamentMetadata };
}

async function _loadTournamentData(tournamentId: string): Promise<TournamentWithUnofficialStandings | undefined> {
  return unstable_cache(
    async (tournamentId: string) => {
      const redisKey = `tournaments/${tournamentId}`;
      const redisResult = await redis.get(redisKey);

      if (redisResult) {
        return calculateUnofficialStandings(JSON.parse(redisResult));
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

      const tournament = calculateUnofficialStandings(calculatePlayerScores(xmlToObject(latestResult.content)));

      await redis
        .multi()
        .set(redisKey, JSON.stringify(tournament))
        .expire(redisKey, 60 * 60 * 6)
        .exec();

      return tournament;
    },
    ['tournaments', `tournaments:${tournamentId}`],
    { tags: ['tournaments', `tournaments:${tournamentId}`] }
  )(tournamentId);
}
