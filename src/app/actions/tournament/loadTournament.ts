'use server';

import 'server-only';

import { unstable_cache } from 'next/cache';

import { Tournament } from '@/app/actions/tournament/types';
import { getStore } from '@/blobs';

export async function loadTournament(tournamentId: string) {
  return unstable_cache(
    async (tournamentId: string) => {
      console.log('Loading tournament', tournamentId);
      const store = await getStore('tournaments');
      const result = await store.getJSON<Tournament>(tournamentId);
      return result?.content;
    },
    ['tournaments', tournamentId],
    { tags: ['tournaments', tournamentId] }
  )(tournamentId);
}
