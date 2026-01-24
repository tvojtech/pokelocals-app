'use client';

import { useRollbar } from '@rollbar/react';
import { useParams } from 'next/navigation';

import { Match, Player, PlayerResult, Pod, Tournament } from '@/actions/tournament';
import { mapOutcomeToPlayerResult } from '@/actions/tournament/tournamentUtils';
import { getPlayerName } from '@/app/pokemonUtils';
import { PlayerScore } from '@/app/tournaments/[id]/pairings/PlayerScore';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function PlayerMatches({
  player,
  pod: myPod,
  tournament,
  anonymize,
}: {
  player: Player;
  pod: Pod;
  tournament: Tournament;
  anonymize: boolean;
}) {
  const playerMatches = myPod.rounds
    .map(round => ({
      match: round.matches.find(match => match.player1 === player.userid || match.player2 === player.userid),
      round: round.number,
    }))
    .filter(({ match }) => match !== undefined)
    .filter(({ match }) => !!match?.outcome)
    .reverse();

  return (
    <div className="flex flex-col gap-1">
      {playerMatches.map(
        ({ match, round }, idx) =>
          (match && (
            <ResultRow
              key={idx}
              round={round}
              match={match}
              tournament={tournament}
              me={player}
              anonymize={anonymize}
            />
          )) ||
          null
      )}
    </div>
  );
}

function ResultRow({
  round,
  match,
  tournament,
  me,
  anonymize,
}: {
  round: string;
  match: Match;
  tournament: Tournament;
  me: Player;
  anonymize: boolean;
}) {
  const rollbar = useRollbar();
  const { id } = useParams();

  const outcome = mapOutcomeToPlayerResult(match, me.userid);

  if (!outcome) {
    rollbar.error(`Unknown match outcome ${JSON.stringify({ match, tournamentId: id })}`);
  }

  const opponent = match?.player1 === me.userid ? match?.player2 : match?.player1;

  return (
    <Card>
      <CardContent className="px-4 py-2">
        <div className="flex items-center gap-2">
          <span>R{round}:</span>
          <span
            className={cn('font-bold', {
              'text-green-600': outcome === PlayerResult.win || outcome === PlayerResult.bye,
              'text-red-600': outcome === PlayerResult.loss,
              'text-yellow-600': outcome === PlayerResult.tie,
            })}>
            {outcome === PlayerResult.win && 'W'}
            {outcome === PlayerResult.bye && 'BYE'}
            {outcome === PlayerResult.loss && 'L'}
            {outcome === PlayerResult.tie && 'T'}
            {outcome === PlayerResult.not_finished && '?'}
          </span>
          {opponent && (
            <div>
              vs. {getPlayerName(tournament, opponent, anonymize)}{' '}
              <PlayerScore score={tournament.playerResults[opponent] ?? []} />
              {tournament.players[opponent].dropped && <span> Dropped</span>}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
