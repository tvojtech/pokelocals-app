import { auth } from '@clerk/nextjs/server';

import { loadTournament, loadTournamentMetadata } from '@/actions/tournament';
import { Pairings } from '@/app/tournaments/[id]/pairings/all/Pairings';
import { timeExtensionsFlag } from '@/flags';

export default async function TournamentPairingsAllPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { orgId, userId } = await auth();

  const tournamentResult = await loadTournament(id);
  const timeExtensionsFlagResult = await timeExtensionsFlag.run({
    identify: { userId: userId },
  });

  if (!tournamentResult) {
    return null;
  }

  const isTimeExtensionsEnabled = timeExtensionsFlagResult && tournamentResult.__metadata.organizationId === orgId;

  return <Pairings isTimeExtensionsEnabled={isTimeExtensionsEnabled} tournament={tournamentResult} />;
}
