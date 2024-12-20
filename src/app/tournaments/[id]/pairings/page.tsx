import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

import { loadTournament } from "@/app/actions/tournament";
import { Pairings } from "@/app/tournaments/[id]/my-pairings/Pairings";

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
        <div className="flex justify-end">
          <Link
            href={`/tournaments/${id}/my-pairings`}
            className="flex items-center gap-1 text-primary font-bold text-xl"
          >
            My pairings <SquareArrowOutUpRight size={20} />
          </Link>
        </div>
        <Pairings tournament={tournament} />
      </div>
    </>
  );
}
