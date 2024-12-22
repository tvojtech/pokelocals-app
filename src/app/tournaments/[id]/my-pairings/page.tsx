import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

import { loadTournament } from "@/app/actions/tournament";
import { QRCodeOverlay } from "@/app/components/QRCodeOverlay";
import { MyInformation } from "@/app/tournaments/[id]/my-pairings/MyInformation";

export default async function MyPairings({
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
        <div className="flex justify-between">
          <Link
            href={`/tournaments/${id}/pairings`}
            className="flex items-center gap-1 text-primary font-bold text-xl"
          >
            Pairings <SquareArrowOutUpRight size={20} />
          </Link>
          <QRCodeOverlay />
        </div>
        <MyInformation tournament={tournament} />
      </div>
    </>
  );
}
