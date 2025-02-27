import { loadTournament } from '@/app/actions/tournament';
import { Pairings } from '@/app/tournaments/[id]/pairings/all/Pairings';

export default async function TournamentPairingsAllPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tournament = await loadTournament(id);
  if (!tournament) {
    return null;
  }

  return <Pairings tournament={tournament} />;
}
