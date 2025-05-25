import { unstable_cacheTag } from 'next/cache';

import { loadTournament } from '@/actions/tournament';
import { Pairings } from '@/app/tournaments/[id]/pairings/all/Pairings';
import { getTournamentCacheKey } from '@/cache-keys';

export default async function TournamentPairingsAllPage({ params }: { params: Promise<{ id: string }> }) {
  'use cache';
  const { id } = await params;
  unstable_cacheTag(getTournamentCacheKey(id));
  console.log(`cache miss: all pairings: ${getTournamentCacheKey(id)}`);

  const tournamentResult = await loadTournament(id);
  if (!tournamentResult) {
    return null;
  }

  return <Pairings tournament={tournamentResult} />;
}
