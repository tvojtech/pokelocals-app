import { Division, Tournament } from '@/actions/tournament';
import { guessFullName } from '@/app/utils';

export function getPlayerName(tournament: Tournament, id: string, anonymize: boolean = false) {
  const player = tournament.players[id];
  return guessFullName({
    firstname: player.firstname,
    lastname: anonymize ? player.lastname.charAt(0) + '.' : player.lastname,
  });
}

export function getPlayerDivision(playerYear: number, startDate: Date) {
  const now = startDate;
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const seasonStartYear = currentYear - (currentMonth < 7 ? 1 : 0);
  const juniorsCutoff = seasonStartYear - 11;
  const seniorsCutoff = seasonStartYear - 15;

  if (playerYear >= juniorsCutoff) {
    return Division.JUNIORS;
  } else if (playerYear >= seniorsCutoff) {
    return Division.SENIORS;
  } else {
    return Division.MASTERS;
  }
}
