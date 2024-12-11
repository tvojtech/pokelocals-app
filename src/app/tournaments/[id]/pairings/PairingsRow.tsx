import { Match, Player, Tournament } from "@/app/actions/tournament";
import { guessFullName } from "@/app/utils";

const getPlayerNameForId = (players: Player[]) => (id: string) => {
  const player = players.find((player) => player.userid === id);
  return guessFullName(player);
};

export const PairingsRow: React.FC<{
  tournament: Tournament;
  match: Match;
}> = ({ tournament, match }) => {
  const getPlayerName = getPlayerNameForId(tournament.players);
  return (
    <>
      <div>{getPlayerName(match.player1)}</div>
      <div className="text-center">Table {match.tablenumber}</div>
      <div>{match.player2 ? getPlayerName(match.player2) : "BYE"}</div>
    </>
  );
};
