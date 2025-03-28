'use server';

import { currentUser } from '@clerk/nextjs/server';

import { getStore } from '@/blobs';

import { Tournament } from './types';

export async function listTournaments() {
  const user = await currentUser();
  if (!user) {
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
      if (
        tournamentData.metadata?.uploaded_by !==
        user?.primaryEmailAddress?.emailAddress
      ) {
        return undefined;
      }
      return { id: tournamentId, ...tournamentData.content };
    })
  );
  return data.filter(d => d !== undefined);
}
