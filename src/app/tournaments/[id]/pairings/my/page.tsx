import { loadTournament } from '@/app/actions/tournament';
import { MyInformation } from '@/app/tournaments/[id]/pairings/my/MyInformation';

export default async function TournamentPairingsMyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tournament = await loadTournament(id);
  if (!tournament) {
    return null;
  }

  return <MyInformation tournament={tournament} />;
}
