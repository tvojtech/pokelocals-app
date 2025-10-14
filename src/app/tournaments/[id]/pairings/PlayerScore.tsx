import { PlayerResult } from '@/actions/tournament';
import { mapPlayerResultToPoints } from '@/actions/tournament/tournamentUtils';

function calculateScore(score: PlayerResult[]) {
  return score.reduce(
    (acc, next) => {
      switch (next) {
        case PlayerResult.win:
        case PlayerResult.bye:
          acc.wins += 1;
          break;
        case PlayerResult.tie:
          acc.ties += 1;
          break;
        case PlayerResult.loss:
          acc.losses += 1;
          break;
      }
      acc.points += mapPlayerResultToPoints(next);
      return acc;
    },
    { wins: 0, ties: 0, losses: 0, points: 0 }
  );
}

export function PlayerScore({ score }: { score: PlayerResult[] }) {
  const { wins, ties, losses, points } = calculateScore(score);
  const scoreString = `(${wins}-${losses}-${ties}) ${points} pts`;
  return <span className="whitespace-nowrap">{scoreString}</span>;
}
