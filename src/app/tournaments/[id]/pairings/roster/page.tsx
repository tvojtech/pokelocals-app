import { loadTournament } from '@/actions/tournament';
import { Roster } from '@/app/tournaments/[id]/pairings/roster/Roster';

export default async function TournamentPairingsRosterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tournamentResult = await loadTournament(id);
  if (!tournamentResult) {
    return null;
  }

  return <Roster tournament={tournamentResult} />;
}
