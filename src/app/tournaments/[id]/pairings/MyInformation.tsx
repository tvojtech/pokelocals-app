"use client";

import { useIsClient } from "@uidotdev/usehooks";

import { Tournament } from "@/app/actions/tournament";
import { MyCurrentPairing } from "@/app/tournaments/[id]/pairings/MyCurrentPairing";
import { MyID } from "@/app/tournaments/[id]/pairings/MyID";
import { MyMatches } from "@/app/tournaments/[id]/pairings/MyMatches";

export const MyInformation: React.FC<{ tournament: Tournament }> = ({
  tournament,
}) => {
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return (
    <>
      <MyID />
      <MyCurrentPairing tournament={tournament} />
      <MyMatches tournament={tournament} />
    </>
  );
};
