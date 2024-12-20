"use client";

import { useIsClient } from "@uidotdev/usehooks";
import { SquareArrowOutUpRight } from "lucide-react";

import { Tournament } from "@/app/actions/tournament";
import { Alert } from "@/app/components/Alert";
import { useDrawer } from "@/app/components/Header";
import { useMyPokemonId } from "@/app/hooks";
import { MyCurrentPairing } from "@/app/tournaments/[id]/my-pairings/MyCurrentPairing";
import { MyMatches } from "@/app/tournaments/[id]/my-pairings/MyMatches";

export const MyInformation: React.FC<{ tournament: Tournament }> = ({
  tournament,
}) => {
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return <MyInformationInternal tournament={tournament} />;
};

const MyInformationInternal: React.FC<{ tournament: Tournament }> = ({
  tournament,
}) => {
  const { myId } = useMyPokemonId();
  const { toggleDrawer } = useDrawer();

  const alert = (
    <Alert
      message={
        <>
          To view your pairings set up your Pokemon ID{" "}
          <button onClick={() => toggleDrawer(true)}>
            <div className="flex flex-row items-center gap-x-0.5">
              here
              <SquareArrowOutUpRight size={20} />
            </div>
          </button>
        </>
      }
      type="warning"
    />
  );

  if (!myId) {
    return alert;
  }

  const { players, pods } = tournament;

  const me = players.find((player) => player.userid === myId);

  if (!me) {
    console.log("me not found");
    return alert;
  }

  const myPod = pods.find((pod) =>
    pod.subgroups.some((subgroup) => subgroup.players.includes(me.userid))
  );

  if (!myPod) {
    console.log("myPod not found");
    return alert;
  }

  return (
    <>
      <MyCurrentPairing me={me} pod={myPod} tournament={tournament} />
      <MyMatches me={me} pod={myPod} tournament={tournament} />
    </>
  );
};
