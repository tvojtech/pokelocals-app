'use client';

import { useRollbar } from '@rollbar/react';
import { useParams } from 'next/navigation';

import { Match, Player, Pod, Tournament } from '@/actions/tournament';
import { mapOutcomeToPlayerResult, PlayerResult } from '@/actions/tournament/tournamentUtils';
import { getPlayerName } from '@/app/pokemonUtils';
import { PlayerScore } from '@/app/tournaments/[id]/pairings/PlayerScore';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function MyMatches({ me, pod: myPod, tournament }: { me: Player; pod: Pod; tournament: Tournament }) {
  const myMatches = myPod.rounds
    .map(round => ({
      match: round.matches.find(match => match.player1 === me.userid || match.player2 === me.userid),
      round: round.number,
    }))
    .filter(({ match }) => match !== undefined)
    .filter(({ match }) => !!match?.outcome)
    .reverse();

  return (
    <div className="flex flex-col gap-1">
      {myMatches.map(
        ({ match, round }, idx) =>
          (match && <ResultRow key={idx} round={round} match={match} tournament={tournament} me={me} />) || null
      )}
    </div>
  );
}

function ResultRow({
  round,
  match,
  tournament,
  me,
}: {
  round: string;
  match: Match;
  tournament: Tournament;
  me: Player;
}) {
  const rollbar = useRollbar();
  const { id } = useParams();

  const outcome = mapOutcomeToPlayerResult(match, me.userid);

  if (!outcome) {
    rollbar.error(`Unknown match outcome ${JSON.stringify({ match, tournamentId: id })}`);
  }

  let opponent;

  if (match?.player1 === me.userid) {
    opponent = match?.player2;
  } else {
    opponent = match?.player1;
  }

  if (!opponent) {
    return (
      <Card>
        <CardContent className="px-4 py-2">
          <div className="col-span-3">
            R{round}: <span className="font-bold text-green-600">BYE</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="px-4 py-2">
        <div className="flex items-center gap-2">
          <span>R{round}:</span>
          <span
            className={cn('font-bold', {
              'text-green-600': outcome === PlayerResult.win,
              'text-red-600': outcome === PlayerResult.loss,
              'text-yellow-600': outcome === PlayerResult.tie,
            })}>
            {outcome === PlayerResult.win && 'W'}
            {outcome === PlayerResult.loss && 'L'}
            {outcome === PlayerResult.tie && 'T'}
            {outcome === PlayerResult.not_finished && '?'}
          </span>
          <div>
            vs. {getPlayerName(tournament, opponent)} <PlayerScore score={tournament.scores[opponent]} />
            {tournament.players[opponent].dropped && <span> Dropped</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
  // return (
  //   <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-2">
  //     <span>R{round}:</span>
  //     <span
  //       className={cn('font-bold', {
  //         'text-green-600': outcome === MatchOutcome.WIN,
  //         'text-red-600': outcome === MatchOutcome.LOSS,
  //         'text-yellow-600': outcome === MatchOutcome.TIE,
  //       })}>
  //       {outcome === MatchOutcome.WIN ? 'W' : outcome === MatchOutcome.LOSS ? 'L' : 'T'}
  //     </span>
  //     <div>
  //       vs. {getPlayerName(tournament, opponent)} <PlayerScore score={tournament.scores[opponent]} />
  //       {tournament.players[opponent].dropped && <span> Dropped</span>}
  //     </div>
  //   </div>
  // );
}
