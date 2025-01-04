import { Player } from '@/app/actions/tournament';
import { guessFullName } from '@/app/utils';

export const getPlayerNameForId = (players: Player[]) => (id: string) => {
  const player = players.find(player => player.userid === id);
  return guessFullName(player);
};

export enum MatchOutcome {
  BYE = 'BYE',
  TIE = 'TIE',
  WIN = 'WIN',
  LOSS = 'LOSS',
}
