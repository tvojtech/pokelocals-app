import { Match, Tournament } from '@/app/actions/tournament';
import { getPlayerNameForId } from '@/app/pokemonUtils';
import { PlayerScore } from '@/app/tournaments/[id]/pairings/PlayerScore';

export function PairingsRow({
  tournament,
  match,
}: {
  tournament: Tournament;
  match: Match;
}) {
  const getPlayerName = getPlayerNameForId(tournament.players);
  return (
    <>
      <div className="flex flex-col items-start justify-center pl-2">
        <div>{getPlayerName(match.player1)}</div>
        <div>
          <PlayerScore score={tournament.scores[match.player1]} />
        </div>
      </div>
      <div className="flex items-center justify-center">
        Table {match.tablenumber}
      </div>
      <div className="flex flex-col items-end justify-center pr-2">
        {match.player2 ? (
          <>
            <div className="text-end">{getPlayerName(match.player2)}</div>
            <div>
              <PlayerScore score={tournament.scores[match.player2]} />
            </div>
          </>
        ) : (
          'BYE'
        )}
      </div>
    </>
  );
}
