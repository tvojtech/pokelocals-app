import { PlayerScore as PlayerScoreType } from '@/actions/tournament';

export function PlayerScore({ score: { wins, losses, ties } }: { score: PlayerScoreType }) {
  const score = `(${wins}-${losses}-${ties}) ${wins * 3 + ties} pts`;

  return <span className="whitespace-nowrap">{score}</span>;
}
