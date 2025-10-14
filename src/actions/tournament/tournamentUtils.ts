import {
  Division,
  Match,
  Player,
  PlayerResult,
  Tournament,
  TournamentWithUnofficialStandings,
  XmlTournament,
} from '@/actions/tournament/types';

export function calculatePlayerScores(tournament: XmlTournament): Tournament {
  const { players, pods } = tournament;

  const resultsByPlayer = pods
    .map(pod => pod.rounds)
    .flat()
    .map(round => round.matches)
    .flat()
    .map(match =>
      [
        { playerId: match.player1, outcome: mapOutcomeToPlayerResult(match, match.player1) },
        match.player2 ? { playerId: match.player2, outcome: mapOutcomeToPlayerResult(match, match.player2) } : null,
      ].filter(obj => !!obj)
    )
    .flat()
    .filter(obj => !!obj.outcome)
    .reduce(
      (acc, next) => {
        if (!acc[next.playerId]) {
          acc[next.playerId] = [];
        }
        if (next.outcome) {
          acc[next.playerId].push(next.outcome);
        }
        return acc;
      },
      {} as Record<string, PlayerResult[]>
    );

  return {
    ...tournament,
    playerResults: resultsByPlayer,
    players: players.reduce((acc, player) => ({ ...acc, [player.userid]: player }), {}),
  };
}

export function calculateUnofficialStandings(tournament: Tournament): TournamentWithUnofficialStandings {
  const playersByDivision = Object.values(tournament.players)
    .map(player => ({
      ...player,
      score: tournament.playerResults[player.userid].map(mapPlayerResultToPoints).reduce((acc, next) => acc + next, 0),
    }))
    .toSorted((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.firstname !== b.firstname) return a.firstname.localeCompare(b.firstname);
      return a.lastname.localeCompare(b.lastname);
    })
    .reduce(
      (acc, player) => ({
        ...acc,
        [player.division]: [...acc[player.division], player],
      }),
      {
        [Division.JUNIORS]: [],
        [Division.SENIORS]: [],
        [Division.MASTERS]: [],
      } as Record<Division, Player[]>
    );
  return {
    ...tournament,
    unofficialStandings: {
      [Division.JUNIORS]: {
        dnf: [],
        finished: playersByDivision[Division.JUNIORS].map((player, idx) => ({ id: player.userid, place: idx + 1 })),
      },
      [Division.SENIORS]: {
        dnf: [],
        finished: playersByDivision[Division.SENIORS].map((player, idx) => ({ id: player.userid, place: idx + 1 })),
      },
      [Division.MASTERS]: {
        dnf: [],
        finished: playersByDivision[Division.MASTERS].map((player, idx) => ({ id: player.userid, place: idx + 1 })),
      },
    },
  };
}

export const mapOutcomeToPlayerResult = (match: Match, player: string): PlayerResult | undefined => {
  const matchOutcome = match.outcome;
  if (!matchOutcome || matchOutcome === '0') {
    // not finished match
    return PlayerResult.not_finished;
  } else if (matchOutcome === '1') {
    return player === match.player1 ? PlayerResult.win : PlayerResult.loss;
  } else if (matchOutcome === '2') {
    return player === match.player1 ? PlayerResult.loss : PlayerResult.win;
  } else if (matchOutcome === '3') {
    return PlayerResult.tie;
  } else if (matchOutcome === '4') {
    return player === match.player1 ? PlayerResult.win : PlayerResult.loss;
  } else if (matchOutcome === '5') {
    return PlayerResult.bye;
  } else if (matchOutcome === '8') {
    return player === match.player1 ? PlayerResult.loss : PlayerResult.win;
  } else if (matchOutcome === '10') {
    // double game loss
    return PlayerResult.loss;
  } else {
    console.error('Unknown match outcome: ' + matchOutcome);
  }
};

export function mapPlayerResultToPoints(result: PlayerResult): number {
  switch (result) {
    case PlayerResult.bye:
    case PlayerResult.win:
      return 3;
    case PlayerResult.tie:
      return 1;
    default:
      return 0;
  }
}
