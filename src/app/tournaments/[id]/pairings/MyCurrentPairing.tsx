"use client";

import { Tournament } from "@/app/actions/tournament";
import { PairingsRow } from "@/app/tournaments/[id]/pairings/PairingsRow";
import { useIsClient, useLocalStorage } from "@uidotdev/usehooks";

export const MyCurrentPairing: React.FC<{ tournament: Tournament }> = ({
  tournament,
}) => {
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return <MyCurrentPairingInternal tournament={tournament} />;
};

const MyCurrentPairingInternal: React.FC<{
  tournament: Tournament;
}> = ({ tournament }) => {
  const [myId] = useLocalStorage<string | undefined>("myPokemonId");

  if (!myId) {
    return null;
  }

  const { players, pods } = tournament;

  const me = players.find((player) => player.userid === myId);

  if (!me) {
    console.log("me not found");
    return null;
  }

  const myPod = pods.find((pod) =>
    pod.subgroups.some((subgroup) => subgroup.players.includes(me.userid))
  );

  if (!myPod) {
    console.log("myPod not found");
    return null;
  }

  const currentRound = myPod.rounds[myPod.rounds.length - 1];
  const myPairing = currentRound.matches.find(
    (match) => match.player1 === me.userid || match.player2 === me.userid
  );

  if (!myPairing) {
    console.log("myPairing not found");
    return null;
  }

  return (
    <div className="grid grid-cols-3">
      <PairingsRow match={myPairing} tournament={tournament} />
    </div>
  );
};
