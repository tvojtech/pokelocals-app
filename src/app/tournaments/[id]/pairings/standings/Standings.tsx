import React from 'react';

import {
  Division,
  DivisionStandings,
  Tournament,
} from '@/app/actions/tournament';
import { getPlayerNameForId } from '@/app/pokemonUtils';
import { PlayerScore } from '@/app/tournaments/[id]/pairings/PlayerScore';
import { Separator } from '@/components/ui/separator';

export function Standings({ tournament }: { tournament: Tournament }) {
  return (
    <div className="space-y-4">
      {[Division.JUNIORS, Division.SENIORS, Division.MASTERS]
        .filter(division => {
          const standings = tournament.standings?.[division];
          return (
            standings &&
            (standings.finished.length > 0 || standings.dnf.length > 0)
          );
        })
        .map(division =>
          tournament.standings?.[division] ? (
            <StandingsSection
              key={division}
              division={division as Division}
              standings={tournament.standings[division]}
              tournament={tournament}
            />
          ) : null
        )}
    </div>
  );
}

const StandingsSection: React.FC<{
  division: Division;
  standings: DivisionStandings;
  tournament: Tournament;
}> = ({ division, standings, tournament }) => {
  const getPlayerName = getPlayerNameForId(tournament.players);
  return (
    <div>
      <h2 className="w-full flex gap-1 justify-center mt-10 border-b-2 mb-2 text-xl font-bold">
        <p className="capitalize">{division.toLowerCase()}</p>(
        {standings.finished.length} players)
      </h2>
      <div className="flex flex-col gap-1">
        {standings.finished
          .toSorted((a, b) => a.place - b.place)
          .map(({ id, place }, idx) => (
            <React.Fragment key={idx}>
              <div className="grid grid-cols-[3rem_1fr] px-4">
                <div>{place}.</div>
                <div className="flex items-center gap-2">
                  {getPlayerName(id)}{' '}
                  <PlayerScore score={tournament.scores[id]} />
                </div>
              </div>
              <Separator />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};
