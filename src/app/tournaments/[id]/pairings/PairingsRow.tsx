import { Match, Tournament } from "@/app/actions/tournament";
import { getPlayerNameForId } from "@/app/pokemonUtils";
import { PlayerScore } from "@/app/tournaments/[id]/pairings/PlayerScore";

export const PairingsRow: React.FC<{
  tournament: Tournament;
  match: Match;
}> = ({ tournament, match }) => {
  const getPlayerName = getPlayerNameForId(tournament.players);
  return (
    <>
      <div className="flex flex-col items-start justify-center">
        <div>{getPlayerName(match.player1)}</div>
        <div>
          <PlayerScore score={tournament.scores[match.player1]} />
        </div>
      </div>
      <div className="flex items-center justify-center">
        Table {match.tablenumber}
      </div>
      <div className="flex flex-col items-start justify-center">
        {match.player2 ? (
          <>
            <div>{getPlayerName(match.player2)}</div>
            <div>
              <PlayerScore score={tournament.scores[match.player2]} />
            </div>
          </>
        ) : (
          "BYE"
        )}
      </div>
    </>
  );
};
