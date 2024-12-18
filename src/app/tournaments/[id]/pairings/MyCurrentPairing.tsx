import { Player, Pod, Tournament } from "@/app/actions/tournament";
import { PairingsRow } from "@/app/tournaments/[id]/pairings/PairingsRow";

export const MyCurrentPairing: React.FC<{
  me: Player;
  pod: Pod;
  tournament: Tournament;
}> = ({ me, pod: myPod, tournament }) => {
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
