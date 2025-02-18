'use server';

import { auth } from '@/app/auth';
import { getStore } from '@/blobs';

import { Tournament } from './types';

export async function listTournaments() {
  const session = await auth();
  if (!session?.user) {
    return undefined;
  }
  const store = await getStore('tournaments');
  const tournaments = await store.list();
  const data = await Promise.all(
    tournaments.map(async tournamentId => {
      const tournamentData = await store.getJSON<Tournament>(tournamentId);
      if (!tournamentData) {
        return undefined;
      }
      if (tournamentData.metadata?.uploaded_by !== session.user?.email) {
        return undefined;
      }
      return { id: tournamentId, ...tournamentData.content };
    })
  );
  return data.filter(d => d !== undefined);
}
