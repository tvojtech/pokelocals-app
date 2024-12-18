import { useLocalStorage } from "@uidotdev/usehooks";

import { Tournament } from "@/app/actions/tournament";
import { getPlayerNameForId, MatchOutcome } from "@/app/pokemonUtils";

export const MyMatches: React.FC<{ tournament: Tournament }> = ({
  tournament,
}) => {
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

  const myMatches = myPod.rounds
    .map((round) => ({
      match: round.matches.find(
        (match) => match.player1 === me.userid || match.player2 === me.userid
      ),
      round: round.number,
    }))
    .filter(({ match }) => match !== undefined)
    .reverse();

  const getPlayerName = getPlayerNameForId(tournament.players);

  return (
    <div className="grid grid-cols-1 gap-2">
      {myMatches.map(({ match, round }, idx) => {
        let outcome: MatchOutcome, opponent;
        if (match?.outcome === "5") {
          outcome = MatchOutcome.BYE;
        } else if (match?.outcome === "3") {
          outcome = MatchOutcome.TIE;
        } else if (match?.player1 === me.userid) {
          outcome =
            match?.outcome === "1" ? MatchOutcome.WIN : MatchOutcome.LOSS;
        } else {
          outcome =
            match?.outcome === "1" ? MatchOutcome.LOSS : MatchOutcome.WIN;
        }

        if (match?.outcome === "5") {
          opponent = "BYE";
        } else if (match?.player1 === me.userid) {
          opponent = match?.player2!;
        } else {
          opponent = match?.player1;
        }

        return (
          <div key={idx}>
            R{round} at table {match?.tablenumber}: {outcome} vs.{" "}
            {getPlayerName(opponent)}
          </div>
        );
      })}
    </div>
  );
};
