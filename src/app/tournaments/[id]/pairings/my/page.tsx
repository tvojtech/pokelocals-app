import { unstable_cacheTag as cacheTag } from 'next/cache';

import { loadTournament } from '@/app/actions/tournament';
import { MyInformation } from '@/app/tournaments/[id]/pairings/my/MyInformation';

export default async function TournamentPairingsMyPage({
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

  return <MyInformation tournament={tournament} />;
}
