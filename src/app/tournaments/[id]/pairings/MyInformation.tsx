"use client";

import { useIsClient, useLocalStorage } from "@uidotdev/usehooks";

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

  return <MyInformationInternal tournament={tournament} />;
};

const MyInformationInternal: React.FC<{ tournament: Tournament }> = ({
  tournament,
}) => {
  const [myId, setMyId] = useLocalStorage<string | undefined>("myPokemonId");

  if (!myId) {
    return <MyID myId={myId} onChangeId={setMyId} />;
  }

  const { players, pods } = tournament;

  const me = players.find((player) => player.userid === myId);

  if (!me) {
    console.log("me not found");
    return <MyID myId={myId} onChangeId={setMyId} />;
  }

  const myPod = pods.find((pod) =>
    pod.subgroups.some((subgroup) => subgroup.players.includes(me.userid))
  );

  if (!myPod) {
    console.log("myPod not found");
    return <MyID myId={myId} onChangeId={setMyId} />;
  }

  return (
    <>
      <MyID myId={myId} onChangeId={setMyId} />
      <MyCurrentPairing me={me} pod={myPod} tournament={tournament} />
      <MyMatches me={me} pod={myPod} tournament={tournament} />
    </>
  );
};
