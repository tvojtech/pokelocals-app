import React from 'react';

import { Pod, Round, Tournament } from '@/actions/tournament';
import { PairingsRow } from '@/app/tournaments/[id]/pairings/PairingsRow';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Pairings({ tournament }: { tournament: Tournament }) {
  const { pods } = tournament;
  if (!pods || pods.length === 0 || pods.every(pod => pod.rounds.length === 0)) {
    return (
      <Alert variant="warning">
        <AlertDescription>Pairings not published yet.</AlertDescription>
      </Alert>
    );
  }
  return (
    <div className="columns-sm space-y-4">
      {pods.map((pod, idx) => {
        if (pod.rounds.length === 0) {
          return null;
        }
        const round = pod.rounds[pod.rounds.length - 1];
        return <PairingsSection key={idx} pod={pod} round={round} tournament={tournament} />;
      })}
    </div>
  );
}

const categoryToDivision: Record<string, string> = {
  '0': 'Juniors',
  '1': 'Seniors',
  '2': 'Masters',
  '8': 'Juniors + Seniors',
  '9': 'Seniors + Masters',
  '10': 'Juniors + Seniors + Masters',
};

const getDivisionString = (pod: Pod) => categoryToDivision[pod.category] ?? null;

const PairingsSection: React.FC<{
  pod: Pod;
  round: Round;
  tournament: Tournament;
}> = ({ pod, round, tournament }) => {
  const divisionString = getDivisionString(pod);
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {divisionString && divisionString + ' - '}
          Round {round.number}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-0 gap-y-1">
          {round.matches
            .toSorted((a, b) => a.tablenumber - b.tablenumber)
            .map((match, idx) => (
              <React.Fragment key={idx}>
                <PairingsRow match={match} tournament={tournament} />
                {idx < round.matches.length - 1 && <div className="col-span-3 border-t border-t-gray-200" />}
              </React.Fragment>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};
