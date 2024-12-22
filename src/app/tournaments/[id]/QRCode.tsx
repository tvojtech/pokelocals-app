"use client";

import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import React from "react";

import { useWindowLocation } from "@/app/hooks";

export const QRCode: React.FC<{ tournamentId: string }> = ({
  tournamentId,
}) => {
  const location = useWindowLocation();

  if (!location?.origin) {
    return null;
  }

  const myPairingsUrl = `${origin}/tournaments/${tournamentId}/my-pairings`;
  const pairingsUrl = `${origin}/tournaments/${tournamentId}/pairings`;

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="print:block hidden">{myPairingsUrl}</p>
      <Link
        href={pairingsUrl}
        target="_blank"
        className="print:hidden flex items-center gap-1 text-primary font-bold text-xl"
      >
        Show pairings <SquareArrowOutUpRight size={20} />
      </Link>
      <QRCodeSVG value={myPairingsUrl} className="w-60 h-60 m-10" />
    </div>
  );
};
