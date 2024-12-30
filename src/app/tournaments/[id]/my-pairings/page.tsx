import { loadTournament } from "@/app/actions/tournament";
import { Alert } from "@/app/components/Alert";
import { MyInformation } from "@/app/tournaments/[id]/my-pairings/MyInformation";
import { PageTypes } from "@/app/tournaments/[id]/PageTypes";

export default async function MyPairings({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const tournament = await loadTournament(id);

  return (
    <>
      {tournament && (
        <h1 className="text-3xl font-bold text-center">
          {tournament.data.name}
        </h1>
      )}
      <div className="max-w-lg mx-auto mt-8 space-y-10">
        {!tournament ? (
          <Alert type="warning" message="Pairings not published yet." />
        ) : (
          <>
            <PageTypes id={id} selectedPage="my-pairings" />
            <MyInformation tournament={tournament} />
          </>
        )}
      </div>
    </>
  );
}
