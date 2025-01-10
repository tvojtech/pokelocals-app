import { unstable_cacheTag as cacheTag } from 'next/cache';

import { loadTournament } from '@/app/actions/tournament';
import { Roster } from '@/app/tournaments/[id]/pairings/roster/Roster';

export default async function TournamentPairingsRosterPage({
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

  return <Roster tournament={tournament} />;
}
