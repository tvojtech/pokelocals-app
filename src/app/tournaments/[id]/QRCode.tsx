"use client";

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

  return (
    <QRCodeSVG
      value={`${origin}/tournaments/${tournamentId}/my-pairings`}
      className="w-60 h-60 m-10"
    />
  );
};
