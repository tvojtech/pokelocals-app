import { loadTournament } from '@/actions/tournament';
import { Standings } from '@/app/tournaments/[id]/pairings/standings/Standings';

export default async function TournamentPairingsStandingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tournamentResult = await loadTournament(id);
  if (!tournamentResult) {
    return null;
  }

  return <Standings tournament={tournamentResult} />;
}
