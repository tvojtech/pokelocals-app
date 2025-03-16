'use server';

import 'server-only';

import { unstable_cache } from 'next/cache';

import { Player, Tournament } from '@/app/actions/tournament/types';
import { getStore } from '@/blobs';

export async function loadTournament(tournamentId: string) {
  return unstable_cache(
    async (tournamentId: string) => {
      console.log('Loading tournament', tournamentId);
      const store = await getStore('tournaments');
      const result = await store.getJSON<Tournament>(tournamentId);
      const content = result?.content;
      if (!content) {
        return content;
      }
      return {
        ...content,
        // this is only temporary until all stored files are removed
        // few days
        // fixme: remove
        players: Array.isArray(content.players)
          ? content.players.reduce(
              (acc, player) => ({ ...acc, [player.userid]: player }),
              {} as Record<string, Player>
            )
          : content.players,
      };
    },
    ['tournaments', tournamentId],
    { tags: ['tournaments', tournamentId] }
  )(tournamentId);
}
