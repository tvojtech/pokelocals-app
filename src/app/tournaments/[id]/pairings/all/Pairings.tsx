import { cookies } from 'next/headers';
import React from 'react';

import { Pod, Round, Tournament } from '@/app/actions/tournament';
import { Alert } from '@/app/components/Alert';
import { PairingsRow } from '@/app/tournaments/[id]/pairings/PairingsRow';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export async function Pairings({ tournament }: { tournament: Tournament }) {
  const { pods } = tournament;
  const cookieStore = await cookies();

  if (!pods || pods.length === 0) {
    return <Alert type="warning" message="Pairings not published yet." />;
  }

  return (
    <Accordion
      type="single"
      collapsible
      value={
        cookieStore.get('pairing:selectedCategory')?.value ??
        pods?.[0]?.category
      }
      onValueChange={async value => {
        'use server';
        (await cookies()).set('pairing:selectedCategory', value);
        console.log(value);
      }}>
      {pods.map((pod, idx) => (
        <PairingsSection
          key={idx}
          pod={pod}
          round={pod.rounds[pod.rounds.length - 1]}
          tournament={tournament}
        />
      ))}
    </Accordion>
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

function PairingsSection({
  pod,
  round,
  tournament,
}: {
  pod: Pod;
  round: Round;
  tournament: Tournament;
}) {
  const divisionString = getDivisionString(pod);
  return (
    <AccordionItem value={pod.category}>
      <AccordionTrigger>
        <div className="w-full flex justify-center text-lg font-bold">
          {divisionString && divisionString + ' - '} Round {round.number}
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-10">
        <div className="grid grid-cols-3 align-center gap-0 gap-y-1 text-lg">
          {round.matches
            .toSorted((a, b) => a.tablenumber - b.tablenumber)
            .map((match, idx) => (
              <React.Fragment key={idx}>
                <div
                  className="border-t border-t-gray-200"
                  style={{ gridColumn: '1 / 5' }}
                />
                <PairingsRow match={match} tournament={tournament} />
              </React.Fragment>
            ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
