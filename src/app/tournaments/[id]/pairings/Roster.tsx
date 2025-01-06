import React from 'react';

import { Player, Tournament } from '@/app/actions/tournament';
import { Alert } from '@/app/components/Alert';
import { getPlayerNameForId } from '@/app/pokemonUtils';
import { Separator } from '@/components/ui/separator';

enum Division {
  Juniors = 'Juniors',
  Seniors = 'Seniors',
  Masters = 'Masters',
}

const getPlayerDivision = (player: Player) => {
  // fixme: this changes every year, find a better way to determine division
  const birthYear = new Date(player.birthdate).getFullYear();

  if (birthYear >= 2013) {
    return Division.Juniors;
  } else if (birthYear >= 2009) {
    return Division.Seniors;
  } else {
    return Division.Masters;
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
      [Division.Juniors]: [],
      [Division.Seniors]: [],
      [Division.Masters]: [],
    }
  );
};

export const Roster: React.FC<{ tournament: Tournament }> = ({
  tournament,
}) => {
  const { players } = tournament;
  if (!players || players.length === 0) {
    return <Alert type="warning" message="Roster not published yet." />;
  }

  const playersByDivision = groupPlayersByDivision(players);

  return (
    <div className="space-y-4">
      {[Division.Juniors, Division.Seniors, Division.Masters].map(
        (division, idx) => (
          <PlayersSection
            key={idx}
            players={playersByDivision[division]}
            tournament={tournament}
            title={division}
          />
        )
      )}
    </div>
  );
};

const PlayersSection: React.FC<{
  players: Player[];
  tournament: Tournament;
  title: string;
}> = ({ players, tournament, title }) => {
  const getPlayerName = getPlayerNameForId(tournament.players);
  const sortedPlayers = [...players].sort((p1, p2) => {
    const p1Name = getPlayerName(p1.userid);
    const p2Name = getPlayerName(p2.userid);
    return p1Name.localeCompare(p2Name);
  });
  return (
    <div>
      <h2 className="w-full flex justify-center mt-10 border-b-2 mb-2 text-xl font-bold">
        {title}
      </h2>
      <div className="flex flex-col gap-2">
        {sortedPlayers.map((player, idx) => (
          <React.Fragment key={idx}>
            <div key={idx} className="grid grid-cols-2 gap-2">
              <div>{getPlayerName(player.userid)}</div>
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
