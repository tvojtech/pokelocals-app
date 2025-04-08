'use server';

import 'server-only';

import { unstable_cache } from 'next/cache';

import { StoredTournament, Tournament } from '@/actions/tournament/types';
import { getStore } from '@/blobs';

export async function loadTournament(tournamentId: string): Promise<StoredTournament | undefined> {
  return unstable_cache(
    async (tournamentId: string) => {
      const store = await getStore('tournaments');
      const result = await store.getJSON<Tournament>(tournamentId);
      if (!result) {
        return undefined;
      }
      return {
        tournament: result.content,
        metadata: {
          uploaded_at: result.metadata.uploaded_at,
          uploaded_by: result.metadata.uploaded_by,
        },
      };
    },
    ['tournaments', tournamentId],
    { tags: ['tournaments', tournamentId] }
  )(tournamentId);
}
