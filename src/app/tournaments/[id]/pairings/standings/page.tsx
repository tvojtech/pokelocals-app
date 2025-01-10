import { unstable_cacheTag as cacheTag } from 'next/cache';

import { loadTournament } from '@/app/actions/tournament';
import { Standings } from '@/app/tournaments/[id]/pairings/standings/Standings';

export default async function TournamentPairingsStandingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  'use cache';
  const { id } = await params;
  cacheTag('tournament:' + id);
  const tournament = await loadTournament(id);
  if (!tournament) {
    return null;
  }

  return <Standings tournament={tournament} />;
}
