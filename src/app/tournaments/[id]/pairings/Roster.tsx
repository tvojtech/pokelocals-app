import React from 'react';

import { Player, Tournament } from '@/app/actions/tournament';
import { Alert } from '@/app/components/Alert';
import { getPlayerNameForId } from '@/app/pokemonUtils';
import { Separator } from '@/components/ui/separator';

export const Roster: React.FC<{ tournament: Tournament }> = ({
  tournament,
}) => {
  const { players } = tournament;
  if (!players || players.length === 0) {
    return <Alert type="warning" message="Roster not published yet." />;
  }

  const playersByDivision = { 'Registered players': players };

  return (
    <div className="space-y-4">
      {Object.entries(playersByDivision).map(([title, players], idx) => (
        <PlayersSection
          key={idx}
          players={players}
          tournament={tournament}
          title={title}
        />
      ))}
    </div>
  );
};

const PlayersSection: React.FC<{
  players: Player[];
  tournament: Tournament;
  title: string;
}> = ({ players, tournament, title }) => {
  const getPlayerName = getPlayerNameForId(tournament.players);
  return (
    <div>
      <h2 className="w-full flex justify-center mt-10 border-b-2 mb-2 text-xl font-bold">
        {title}
      </h2>
      <div className="flex flex-col gap-2">
        {players.map((player, idx) => (
          <React.Fragment key={idx}>
            <div key={idx} className="flex flex-row gap-8">
              <div>{getPlayerName(player.userid)}</div>
              <div className="flex items-center gap-2">
                {player.late && (
                  <span className="text-red-600 flex items-center gap-2">
                    Late
                  </span>
                )}
                {player.byes ? (
                  <span>
                    {player.late && ' | '}
                    {player.byes} {player.byes === 1 ? 'round' : 'rounds'} bye
                  </span>
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
