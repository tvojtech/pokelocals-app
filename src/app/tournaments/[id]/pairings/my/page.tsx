import { loadTournamentData } from '@/actions/tournament';
import { MyInformation } from '@/app/tournaments/[id]/pairings/my/MyInformation';

export default async function TournamentPairingsMyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tournamentResult = await loadTournamentData(id);
  if (!tournamentResult) {
    return null;
  }

  return <MyInformation tournament={tournamentResult} />;
}
