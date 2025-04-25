import { loadTournamentData } from '@/actions/tournament';
import { Pairings } from '@/app/tournaments/[id]/pairings/all/Pairings';

export default async function TournamentPairingsAllPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tournamentResult = await loadTournamentData(id);
  if (!tournamentResult) {
    return null;
  }

  return <Pairings tournament={tournamentResult} />;
}
