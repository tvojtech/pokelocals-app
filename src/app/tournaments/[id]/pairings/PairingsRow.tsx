import { Match, Tournament } from "@/app/actions/tournament";
import { getPlayerNameForId } from "@/app/pokemonUtils";

export const PairingsRow: React.FC<{
  tournament: Tournament;
  match: Match;
}> = ({ tournament, match }) => {
  const getPlayerName = getPlayerNameForId(tournament.players);
  return (
    <>
      <div className="flex items-center">{getPlayerName(match.player1)}</div>
      <div className="flex items-center justify-center">
        Table {match.tablenumber}
      </div>
      <div className="flex items-center">
        {match.player2 ? getPlayerName(match.player2) : "BYE"}
      </div>
    </>
  );
};
