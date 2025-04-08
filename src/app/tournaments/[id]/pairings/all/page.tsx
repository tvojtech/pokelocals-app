import { loadTournament } from '@/app/actions/tournament';
import { Pairings } from '@/app/tournaments/[id]/pairings/all/Pairings';

export default async function TournamentPairingsAllPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tournamentResult = await loadTournament(id);
  if (!tournamentResult) {
    return null;
  }

  return <Pairings tournament={tournamentResult.tournament} />;
}
