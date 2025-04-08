'use server';

import { auth } from '@clerk/nextjs/server';

import { getStore } from '@/blobs';

import { loadTournament } from './loadTournament';

export async function listTournaments() {
  const { userId, orgId } = await auth();
  if (!userId) {
    return undefined;
  }
  const store = await getStore('tournaments');
  const tournaments = await store.list();
  const data = await Promise.all(
    tournaments.map(async tournamentId => {
      const tournamentData = await loadTournament(tournamentId);
      if (!tournamentData) {
        return undefined;
      }
      if (tournamentData.metadata?.uploaded_by !== userId && tournamentData.metadata?.uploaded_by !== orgId) {
        return undefined;
      }
      return { id: tournamentId, ...tournamentData.tournament, metadata: tournamentData.metadata };
    })
  );
  return data
    .filter(d => d !== undefined)
    .toSorted((a, b) => new Date(b.metadata.uploaded_at).getTime() - new Date(a.metadata.uploaded_at).getTime());
}
