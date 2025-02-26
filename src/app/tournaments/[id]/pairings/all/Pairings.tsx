import React from 'react';

import { Pod, Round, Tournament } from '@/app/actions/tournament';
import { Alert } from '@/app/components/Alert';
import { PairingsRow } from '@/app/tournaments/[id]/pairings/PairingsRow';

export function Pairings({ tournament }: { tournament: Tournament }) {
  const { pods } = tournament;
  if (!pods || pods.length === 0) {
    return <Alert type="warning" message="Pairings not published yet." />;
  }
  return (
    <div className="space-y-4">
      {pods.map((pod, idx) => (
        <PairingsSection
          key={idx}
          pod={pod}
          round={pod.rounds[pod.rounds.length - 1]}
          tournament={tournament}
        />
      ))}
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

const getDivisionString = (pod: Pod) =>
  categoryToDivision[pod.category] ?? null;

const PairingsSection: React.FC<{
  pod: Pod;
  round: Round;
  tournament: Tournament;
}> = ({ pod, round, tournament }) => {
  const divisionString = getDivisionString(pod);
  return (
    <div>
      <h2 className="w-full flex justify-center mt-10 border-b-2 mb-2 text-xl font-bold">
        {divisionString && divisionString + ' - '}
        Round {round.number}
      </h2>
      <div className="grid grid-cols-3 align-center gap-0 gap-y-1">
        {round.matches
          .toSorted((a, b) => a.tablenumber - b.tablenumber)
          .map((match, idx) => (
            <React.Fragment key={idx}>
              <PairingsRow match={match} tournament={tournament} />
              <div
                className="border-t border-t-gray-200"
                style={{ gridColumn: '1 / 5' }}
              />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};
