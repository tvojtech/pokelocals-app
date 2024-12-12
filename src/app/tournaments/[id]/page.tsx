import { FileUpload } from "@/app/components/FileUpload";
import { QRCode } from "@/app/tournaments/[id]/QRCode";

export default async function TournamentDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="max-w-md mx-auto mt-8">
      <QRCode tournamentId={id} />

      <FileUpload tournamentId={id} />
    </div>
  );
}
