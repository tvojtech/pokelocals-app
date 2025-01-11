'use server';

import { Tournament } from '@/app/actions/tournament/types';
import { getStore } from '@/blobs';

export async function loadTournament(tournamentId: string) {
  const store = await getStore('tournaments');
  return await store.getJSON<Tournament>(tournamentId);
}
