"use client";

import { useIsClient } from "@uidotdev/usehooks";
import { QRCodeSVG } from "qrcode.react";
import React from "react";

const useOrigin = () => {
  const isClient = useIsClient();
  if (!isClient) {
    return undefined;
  }
  return window.location.origin;
};

export const QRCode: React.FC<{ tournamentId: string }> = ({
  tournamentId,
}) => {
  const origin = useOrigin();

  if (!origin) {
    return null;
  }

  return (
    <QRCodeSVG
      value={`${origin}/tournaments/${tournamentId}/pairings`}
      className="w-60 h-60 m-10"
    />
  );
};
