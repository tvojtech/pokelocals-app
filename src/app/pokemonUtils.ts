import { Tournament } from '@/app/actions/tournament';
import { guessFullName } from '@/app/utils';

export function getPlayerName(tournament: Tournament, id: string) {
  console.log('tournament', tournament);
  const player = tournament.players[id];
  return guessFullName(player);
}

export enum MatchOutcome {
  BYE = 'BYE',
  TIE = 'TIE',
  WIN = 'WIN',
  LOSS = 'LOSS',
}
