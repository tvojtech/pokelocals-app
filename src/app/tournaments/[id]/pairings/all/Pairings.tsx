import React from 'react';

import { Pod, Round, Tournament } from '@/actions/tournament';
import { PairingsRow } from '@/app/tournaments/[id]/pairings/PairingsRow';
import { Alert } from '@/components/Alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function Pairings({ tournament }: { tournament: Tournament }) {
  const { pods } = tournament;
  if (!pods || pods.length === 0) {
    return <Alert type="warning" message="Pairings not published yet." />;
  }
  return (
    <div className="columns-sm space-y-8">
      {pods.map((pod, idx) => (
        <PairingsSection key={idx} pod={pod} round={pod.rounds[pod.rounds.length - 1]} tournament={tournament} />
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

const getDivisionString = (pod: Pod) => categoryToDivision[pod.category] ?? null;

const PairingsSection: React.FC<{
  pod: Pod;
  round: Round;
  tournament: Tournament;
}> = ({ pod, round, tournament }) => {
  const divisionString = getDivisionString(pod);
  return (
    <div>
      <h2 className="mb-2 flex w-full justify-center border-b-2 text-xl font-bold">
        {divisionString && divisionString + ' - '}
        Round {round.number}
      </h2>
      <div className="align-center grid grid-cols-3 gap-0 gap-y-1">
        {round.matches
          .toSorted((a, b) => a.tablenumber - b.tablenumber)
          .map((match, idx) => (
            <React.Fragment key={idx}>
              <PairingsRow match={match} tournament={tournament} />
              <div className="border-t border-t-gray-200" style={{ gridColumn: '1 / 5' }} />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

const PairingsSectionNew: React.FC<{
  pod: Pod;
  round: Round;
  tournament: Tournament;
}> = ({ pod, round, tournament }) => {
  const divisionString = getDivisionString(pod);
  return (
    <div>
      <Tabs defaultValue={pod.rounds.length.toString()}>
        <div className="flex justify-center border-b-2 text-lg font-bold">{divisionString && divisionString}</div>
        <TabsList className="flex w-full justify-between rounded-none border-b-2 bg-transparent shadow-none">
          <span className="px-2">Round</span>
          <div>
            {pod.rounds.map((round, idx) => (
              <TabsTrigger
                key={idx}
                value={round.number.toString()}
                className="shadow-none data-[state=active]:bg-muted">
                {round.number}
              </TabsTrigger>
            ))}
          </div>
        </TabsList>
        {pod.rounds.map((round, idx) => (
          <TabsContent key={idx} value={round.number.toString()}>
            <div className="align-center grid grid-cols-3 gap-0 gap-y-1">
              {round.matches
                .toSorted((a, b) => a.tablenumber - b.tablenumber)
                .map((match, idx) => (
                  <React.Fragment key={idx}>
                    <PairingsRow match={match} tournament={tournament} />
                    <div className="border-t border-t-gray-200" style={{ gridColumn: '1 / 5' }} />
                  </React.Fragment>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
