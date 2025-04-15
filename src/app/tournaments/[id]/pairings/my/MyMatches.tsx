import { Match, Player, Pod, Tournament } from '@/actions/tournament';
import { getPlayerName, MatchOutcome } from '@/app/pokemonUtils';
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
      {myMatches.map(({ match, round }, idx) => (
        <ResultRow key={idx} round={round} match={match} tournament={tournament} me={me} />
      ))}
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
  match: Match | undefined;
  tournament: Tournament;
  me: Player;
}) {
  let outcome: MatchOutcome, opponent;
  if (match?.outcome === '5') {
    outcome = MatchOutcome.BYE;
  } else if (match?.outcome === '3') {
    outcome = MatchOutcome.TIE;
  } else if (match?.outcome === '0') {
    return null;
  } else if (match?.player1 === me.userid) {
    outcome = match?.outcome === '1' ? MatchOutcome.WIN : MatchOutcome.LOSS;
  } else {
    outcome = match?.outcome === '1' ? MatchOutcome.LOSS : MatchOutcome.WIN;
  }

  if (match?.player1 === me.userid) {
    opponent = match?.player2;
  } else {
    opponent = match?.player1;
  }

  if (!opponent) {
    return (
      <div className="col-span-3">
        R{round}: <span className="font-bold text-green-600">BYE</span>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="px-4 py-2">
        <div className="flex items-center gap-2">
          <span>R{round}:</span>
          <span
            className={cn('font-bold', {
              'text-green-600': outcome === MatchOutcome.WIN,
              'text-red-600': outcome === MatchOutcome.LOSS,
              'text-yellow-600': outcome === MatchOutcome.TIE,
            })}>
            {outcome === MatchOutcome.WIN ? 'W' : outcome === MatchOutcome.LOSS ? 'L' : 'T'}
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
