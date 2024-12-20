import { PlayerScore as PlayerScoreType } from "@/app/actions/tournament";

export const PlayerScore: React.FC<{ score: PlayerScoreType }> = ({
  score: { wins, losses, ties },
}) => {
  return `(${wins}-${losses}-${ties}) ${wins * 3 + ties} pts`;
};
