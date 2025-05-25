import { unstable_cacheTag } from 'next/cache';

import { loadTournament } from '@/actions/tournament';
import { MyInformation } from '@/app/tournaments/[id]/pairings/my/MyInformation';
import { getTournamentCacheKey } from '@/cache-keys';

export default async function TournamentPairingsMyPage({ params }: { params: Promise<{ id: string }> }) {
  'use cache';
  const { id } = await params;
  unstable_cacheTag(getTournamentCacheKey(id));
  console.log(`cache miss: my pairings: ${getTournamentCacheKey(id)}`);
  const tournamentResult = await loadTournament(id);
  if (!tournamentResult) {
    return null;
  }

  return <MyInformation tournament={tournamentResult} />;
}
