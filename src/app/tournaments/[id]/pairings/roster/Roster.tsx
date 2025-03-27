import React from 'react';

import { Division, Player, Tournament } from '@/app/actions/tournament';
import { getPlayerName } from '@/app/pokemonUtils';
import { Alert } from '@/components/Alert';
import { Separator } from '@/components/ui/separator';

const getPlayerDivision = (player: Player) => {
  // fixme: this changes every year, find a better way to determine division
  const birthYear = new Date(player.birthdate).getFullYear();

  if (birthYear >= 2013) {
    return Division.JUNIORS;
  } else if (birthYear >= 2009) {
    return Division.SENIORS;
  } else {
    return Division.MASTERS;
  }
};

const groupPlayersByDivision = (
  players: Player[]
): Record<Division, Player[]> => {
  return players.reduce(
    (acc, player) => {
      const division = getPlayerDivision(player);
      return {
        ...acc,
        [division]: [...(acc[division] || []), player],
      };
    },
    {
      [Division.JUNIORS]: [],
      [Division.SENIORS]: [],
      [Division.MASTERS]: [],
    }
  );
};

export function Roster({ tournament }: { tournament: Tournament }) {
  const { players } = tournament;
  if (!players || Object.keys(players).length === 0) {
    return <Alert type="warning" message="Roster not published yet." />;
  }

  const playersByDivision = groupPlayersByDivision(Object.values(players));

  return (
    <div className="space-y-4 columns-sm">
      {[Division.JUNIORS, Division.SENIORS, Division.MASTERS]
        .filter(division => playersByDivision[division].length > 0)
        .map((division, idx) => (
          <PlayersSection
            key={idx}
            players={playersByDivision[division]}
            tournament={tournament}
            division={division}
          />
        ))}
    </div>
  );
}

const PlayersSection: React.FC<{
  players: Player[];
  tournament: Tournament;
  division: string;
}> = ({ players, tournament, division }) => {
  const sortedPlayers = players.toSorted((p1, p2) => {
    const p1Name = getPlayerName(tournament, p1.userid);
    const p2Name = getPlayerName(tournament, p2.userid);
    return p1Name.localeCompare(p2Name);
  });
  return (
    <div>
      <h2 className="w-full flex gap-1 justify-center mt-12 lg:mt-0 border-b-2 mb-2 text-xl font-bold">
        <p className="capitalize">{division.toLowerCase()}</p>(
        {sortedPlayers.length} players)
      </h2>
      <div className="flex flex-col gap-2">
        {sortedPlayers.map((player, idx) => (
          <React.Fragment key={idx}>
            <div key={idx} className="grid grid-cols-2 gap-2 px-4">
              <div>{getPlayerName(tournament, player.userid)}</div>
              <div className="flex items-center gap-2">
                {player.late && (
                  <span className="text-red-600 flex items-center gap-2">
                    Late
                  </span>
                )}
                {player.byes ? (
                  <span>
                    {player.byes} {player.byes === 1 ? 'round' : 'rounds'} bye
                  </span>
                ) : null}
                {player.dropped ? (
                  <span>drop round {player.dropped.round}</span>
                ) : null}
              </div>
            </div>
            <Separator />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
