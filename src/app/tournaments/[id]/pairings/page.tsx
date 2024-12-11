import { loadTournament } from "@/app/actions/tournament";
import { MyCurrentPairing } from "@/app/tournaments/[id]/pairings/MyCurrentPairing";
import { MyID } from "@/app/tournaments/[id]/pairings/MyID";
import { Pairings } from "@/app/tournaments/[id]/pairings/Pairings";

export default async function TournamentPairings({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const tournament = await loadTournament(id);

  return (
    <div className="max-w-md mx-auto mt-8 space-y-4">
      <MyID />
      <MyCurrentPairing tournament={tournament} />
      <Pairings tournament={tournament} />
    </div>
  );
}
