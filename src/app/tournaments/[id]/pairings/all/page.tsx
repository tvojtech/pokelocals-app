import { auth } from '@clerk/nextjs/server';

import { loadTournament, loadTournamentMetadata } from '@/actions/tournament';
import { Pairings } from '@/app/tournaments/[id]/pairings/all/Pairings';

export default async function TournamentPairingsAllPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { orgId } = await auth();

  const tournamentResult = await loadTournament(id);
  const tournamentMetadataResult = await loadTournamentMetadata(id);
  console.log(tournamentResult, tournamentMetadataResult);

  if (!tournamentResult || !tournamentMetadataResult) {
    return null;
  }

  const isAdmin = tournamentMetadataResult.organizationId === orgId;

  return <Pairings isAdmin={isAdmin} tournament={tournamentResult} />;
}
