import { FileUpload } from "@/app/components/FileUpload";
import { QRCode } from "@/app/tournaments/[id]/QRCode";

export default async function TournamentDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <h1 className="text-3xl font-bold text-center print:hidden">
        Tournament
      </h1>
      <h1 className="text-3xl font-bold text-center hidden print:block">
        Pairings
      </h1>
      <div className="max-w-lg mx-auto mt-8 space-y-10 flex flex-col items-center justify-center print:h-dvh">
        <QRCode tournamentId={id} />

        <div className="print:hidden">
          <FileUpload tournamentId={id} />
        </div>
      </div>
    </>
  );
}
