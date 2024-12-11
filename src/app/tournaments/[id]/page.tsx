import { FileUpload } from "@/app/components/FileUpload";
import { QRCodeSVG } from "qrcode.react";

export default async function TournamentDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="max-w-md mx-auto mt-8">
      <QRCodeSVG
        value={`http://192.168.101.14:3000/tournaments/${id}/pairings`}
        className="w-60 h-60 m-10"
      />

      <FileUpload projectId={id} />
    </div>
  );
}
