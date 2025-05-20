import { Division, Match, Tournament } from '@/actions/tournament';
import { getPlayerName } from '@/app/pokemonUtils';
import { PlayerScore } from '@/app/tournaments/[id]/pairings/PlayerScore';

export function PairingsRow({
  tournament,
  match,
  anonymize,
}: {
  tournament: Tournament;
  match: Match;
  anonymize?: boolean;
}) {
  return (
    <>
      <div className="flex flex-col items-start justify-center pl-2">
        <div>
          {getPlayerName(
            tournament,
            match.player1,
            anonymize && tournament.players[match.player1].division !== Division.MASTERS
          )}
        </div>
        <div>
          <PlayerScore score={tournament.scores[match.player1]} />
        </div>
      </div>
      <div className="flex items-center justify-center">Table {match.tablenumber}</div>
      <div className="flex flex-col items-end justify-center pr-2">
        {match.player2 ? (
          <>
            <div className="text-end">
              {getPlayerName(
                tournament,
                match.player2,
                anonymize && tournament.players[match.player2].division !== Division.MASTERS
              )}
            </div>
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
