import { unstable_cacheTag } from 'next/cache';

import { loadTournament } from '@/actions/tournament';
import { Roster } from '@/app/tournaments/[id]/pairings/roster/Roster';
import { getTournamentCacheKey } from '@/cache-keys';

export default async function TournamentPairingsRosterPage({ params }: { params: Promise<{ id: string }> }) {
  'use cache';
  const { id } = await params;
  unstable_cacheTag(getTournamentCacheKey(id));
  console.log(`cache miss: roster: ${getTournamentCacheKey(id)}`);

  const tournamentResult = await loadTournament(id);
  if (!tournamentResult) {
    return null;
  }

  return <Roster tournament={tournamentResult} />;
}
