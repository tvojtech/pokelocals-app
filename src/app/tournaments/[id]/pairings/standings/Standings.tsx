import React from 'react';

import { Division, DivisionStandings, Tournament, TournamentWithUnofficialStandings } from '@/actions/tournament';
import { getPlayerName } from '@/app/pokemonUtils';
import { PlayerScore } from '@/app/tournaments/[id]/pairings/PlayerScore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Standings({ tournament }: { tournament: TournamentWithUnofficialStandings }) {
  console.log(tournament.unofficialStandings);
  return (
    <div className="columns-sm space-y-4">
      {[Division.JUNIORS, Division.SENIORS, Division.MASTERS]
        .filter(division => {
          const standings = (tournament.standings ?? tournament.unofficialStandings)?.[division];
          return standings && (standings.finished.length > 0 || standings.dnf.length > 0);
        })
        .map(division =>
          (tournament.standings ?? tournament.unofficialStandings)?.[division] ? (
            <StandingsSection
              key={division}
              division={division as Division}
              standings={(tournament.standings ?? tournament.unofficialStandings)[division]}
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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <p className="capitalize">{division.toLowerCase()}</p>({standings.finished.length} players)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[3rem_1fr_6rem] gap-0 gap-y-1">
          {standings.finished
            .toSorted((a, b) => a.place - b.place)
            .map(({ id, place }, idx) => (
              <React.Fragment key={idx}>
                <div className="pl-2">{place}.</div>
                <div className="flex items-center gap-2">{getPlayerName(tournament, id)}</div>
                <PlayerScore score={tournament.scores[id]} />
                {idx < standings.finished.length - 1 && <div className="col-span-3 border-t border-t-gray-200" />}
              </React.Fragment>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};
