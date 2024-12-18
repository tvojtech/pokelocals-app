import { loadTournament } from "@/app/actions/tournament";
import { MyInformation } from "@/app/tournaments/[id]/pairings/MyInformation";
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
      <MyInformation tournament={tournament} />
      <Pairings tournament={tournament} />
    </div>
  );
}
