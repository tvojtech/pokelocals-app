'use client';

import React, { useState } from 'react';

import { Pod, Round, Tournament } from '@/actions/tournament';
import { PairingsRow } from '@/app/tournaments/[id]/pairings/PairingsRow';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
        return <PairingsSection key={idx} pod={pod} tournament={tournament} />;
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
  tournament: Tournament;
}> = ({ pod, tournament }) => {
  const [selectedRound, setSelectedRound] = useState(pod.rounds[pod.rounds.length - 1]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <PairingsSectionHeader pod={pod} selectedRound={selectedRound} onRoundSelect={setSelectedRound} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-0 gap-y-1">
          {selectedRound.matches
            .toSorted((a, b) => a.tablenumber - b.tablenumber)
            .map((match, idx) => (
              <React.Fragment key={idx}>
                <PairingsRow match={match} tournament={tournament} anonymize />
                {idx < selectedRound.matches.length - 1 && <div className="col-span-3 border-t border-t-gray-200" />}
              </React.Fragment>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

function PairingsSectionHeader({
  pod,
  selectedRound,
  onRoundSelect,
}: {
  pod: Pod;
  selectedRound: Round;
  onRoundSelect: (round: Round) => void;
}) {
  const divisionString = getDivisionString(pod);
  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <div>{divisionString}</div>
      <Select value={selectedRound.number} onValueChange={id => onRoundSelect(pod.rounds.find(r => r.number === id)!)}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {pod.rounds.toReversed().map(round => (
              <SelectItem key={round.number} value={round.number}>
                Round {round.number}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
