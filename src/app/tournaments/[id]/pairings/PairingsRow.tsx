import { Division, Match } from '@/actions/tournament';
import { TournamentWithMetadata } from '@/actions/tournament/loadTournament';
import { getPlayerName } from '@/app/pokemonUtils';
import { PlayerScore } from '@/app/tournaments/[id]/pairings/PlayerScore';

import { TimeExtensionButton } from './TimeExtensionButton';

export function PairingsRow({
  allowTimeExtensions,
  tournament,
  match,
  anonymize,
  round,
}: {
  allowTimeExtensions?: boolean;
  tournament: TournamentWithMetadata;
  match: Match;
  anonymize?: boolean;
  round: number;
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
          <PlayerScore score={(tournament.playerResults[match.player1] ?? []).slice(0, round)} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        Table {match.tablenumber}
        {allowTimeExtensions && <TimeExtensionButton />}
      </div>
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
              <PlayerScore score={(tournament.playerResults[match.player2] ?? []).slice(0, round)} />
            </div>
          </>
        ) : (
          'BYE'
        )}
      </div>
    </>
  );
}
