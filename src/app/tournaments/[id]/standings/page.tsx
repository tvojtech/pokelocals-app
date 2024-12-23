import { loadTournament } from "@/app/actions/tournament";
import { Alert } from "@/app/components/Alert";
import { PageTypes } from "@/app/tournaments/[id]/PageTypes";

export default async function TournamentStandings({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const tournament = await loadTournament(id);

  if (!tournament) {
    return <Alert type="warning" message="Pairings not published yet." />;
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center">{tournament.data.name}</h1>
      <div className="max-w-lg mx-auto mt-8 space-y-10">
        <PageTypes id={id} selectedPage="standings" />
      </div>
    </>
  );
}
