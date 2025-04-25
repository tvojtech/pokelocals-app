import { redirect, RedirectType } from 'next/navigation';

import { loadTournamentData } from '@/actions/tournament';
import { Standings } from '@/app/tournaments/[id]/pairings/standings/Standings';

export default async function TournamentPairingsStandingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tournamentResult = await loadTournamentData(id);
  if (!tournamentResult) {
    return null;
  }

  if (!tournamentResult.standings) {
    return redirect(`/tournaments/${id}/pairings`, RedirectType.replace);
  }

  return <Standings tournament={tournamentResult} />;
}
