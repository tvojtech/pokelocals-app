import { unstable_cacheTag as cacheTag } from 'next/cache';

import { loadTournament } from '@/app/actions/tournament';
import { Pairings } from '@/app/tournaments/[id]/pairings/all/Pairings';

export default async function TournamentPairingsAllPage({
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

  return <Pairings tournament={tournament} />;
}
