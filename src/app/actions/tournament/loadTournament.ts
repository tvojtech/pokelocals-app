'use server';

import { unstable_cacheTag as cacheTag } from 'next/cache';

import { Tournament } from '@/app/actions/tournament/types';
import { getStore } from '@/blobs';

export async function loadTournament(tournamentId: string) {
  'use cache';
  cacheTag('tournament:' + tournamentId);
  const store = await getStore('tournaments');
  return await store.getJSON<Tournament>(tournamentId);
}
