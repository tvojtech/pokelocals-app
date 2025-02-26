import { Player, Pod, Tournament } from '@/app/actions/tournament';
import { PairingsRow } from '@/app/tournaments/[id]/pairings/PairingsRow';

export function MyCurrentPairing({
  me,
  pod: myPod,
  tournament,
}: {
  me: Player;
  pod: Pod;
  tournament: Tournament;
}) {
  const currentRound = myPod.rounds[myPod.rounds.length - 1];
  const myPairing = currentRound.matches.find(
    match => match.player1 === me.userid || match.player2 === me.userid
  );

  if (!myPairing) {
    console.log('myPairing not found');
    return null;
  }

  const opponent =
    myPairing.player1 === me.userid ? myPairing.player2 : myPairing.player1;

  return (
    <div className="grid grid-cols-3 -ml-2">
      <PairingsRow
        match={{ ...myPairing, player1: me.userid, player2: opponent }}
        tournament={tournament}
      />
    </div>
  );
}
