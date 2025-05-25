import { unstable_cacheTag } from 'next/cache';

import { loadTournament } from '@/actions/tournament';
import { Standings } from '@/app/tournaments/[id]/pairings/standings/Standings';
import { getTournamentCacheKey } from '@/cache-keys';

export default async function TournamentPairingsStandingsPage({ params }: { params: Promise<{ id: string }> }) {
  'use cache';
  const { id } = await params;
  unstable_cacheTag(getTournamentCacheKey(id));
  console.log(`cache miss: standings: ${getTournamentCacheKey(id)}`);

  const tournamentResult = await loadTournament(id);
  if (!tournamentResult) {
    return null;
  }

  return <Standings tournament={tournamentResult} />;
}
