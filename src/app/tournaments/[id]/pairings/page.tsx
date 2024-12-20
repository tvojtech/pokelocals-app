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
    <>
      <h1 className="text-3xl font-bold text-center">{tournament.data.name}</h1>
      <div className="max-w-lg mx-auto mt-8 space-y-10">
        <MyInformation tournament={tournament} />
        <Pairings tournament={tournament} />
      </div>
    </>
  );
}
