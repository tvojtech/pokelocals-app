import { Player, Pod, Tournament } from '@/actions/tournament';
import { getPlayerName, MatchOutcome } from '@/app/pokemonUtils';
import { PlayerScore } from '@/app/tournaments/[id]/pairings/PlayerScore';

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
    <div className="grid grid-cols-1 gap-2">
      {myMatches.map(({ match, round }, idx) => {
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
            <div key={idx}>
              R{round}: <span className="font-bold">BYE</span>
            </div>
          );
        }

        return (
          <div key={idx}>
            R{round} at table {match?.tablenumber}: <span className="font-bold">{outcome}</span> vs.{' '}
            {getPlayerName(tournament, opponent)} <PlayerScore score={tournament.scores[opponent]} />
            {tournament.players[opponent].dropped && <span> Dropped</span>}
          </div>
        );
      })}
    </div>
  );
}
