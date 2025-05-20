import React from 'react';

import { Division, Player, Tournament } from '@/actions/tournament';
import { getPlayerDivision, getPlayerName } from '@/app/pokemonUtils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const groupPlayersByDivision = (players: Player[], startDate: Date): Record<Division, Player[]> => {
  return players.reduce(
    (acc, player) => {
      const division = getPlayerDivision(new Date(player.birthdate).getFullYear(), startDate);
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
    return (
      <Alert variant="warning">
        <AlertDescription>Roster not published yet.</AlertDescription>
      </Alert>
    );
  }

  const playersByDivision = groupPlayersByDivision(Object.values(players), new Date(tournament.data.startdate));

  return (
    <div className="columns-sm space-y-4">
      {[Division.JUNIORS, Division.SENIORS, Division.MASTERS]
        .filter(division => playersByDivision[division].length > 0)
        .map((division, idx) => (
          <PlayersSection key={idx} players={playersByDivision[division]} tournament={tournament} division={division} />
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <p className="capitalize">{division.toLowerCase()}</p>({sortedPlayers.length} players)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-0 gap-y-1">
          {sortedPlayers.map((player, idx) => (
            <React.Fragment key={idx}>
              <div className="pl-2">{getPlayerName(tournament, player.userid, division !== Division.MASTERS)}</div>
              <div className="flex items-center gap-2">
                {player.late && <span className="flex items-center gap-2 text-red-600">Late</span>}
                {player.byes ? (
                  <span>
                    {player.byes} {player.byes === 1 ? 'round' : 'rounds'} bye
                  </span>
                ) : null}
                {player.dropped ? <span>drop round {player.dropped.round}</span> : null}
              </div>
              {idx < sortedPlayers.length - 1 && <div className="col-span-2 border-t border-t-gray-200" />}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
