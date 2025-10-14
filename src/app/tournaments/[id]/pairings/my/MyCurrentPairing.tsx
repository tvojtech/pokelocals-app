'use client';

import { useRollbar } from '@rollbar/react';
import { useParams } from 'next/navigation';

import { Player, PlayerResult, Pod, Tournament } from '@/actions/tournament';
import { mapOutcomeToPlayerResult } from '@/actions/tournament/tournamentUtils';
import { PairingsRow } from '@/app/tournaments/[id]/pairings/PairingsRow';
import { Card, CardContent } from '@/components/ui/card';

export function MyCurrentPairing({ me, pod: myPod, tournament }: { me: Player; pod: Pod; tournament: Tournament }) {
  const rollbar = useRollbar();
  const { id } = useParams();

  if (myPod.rounds.length === 0) {
    return null;
  }

  const currentRound = myPod.rounds[myPod.rounds.length - 1];

  const currentMatch = currentRound.matches.find(match => match.player1 === me.userid || match.player2 === me.userid);

  if (!currentMatch) {
    return null;
  }

  const outcome = mapOutcomeToPlayerResult(currentMatch, me.userid);

  if (!outcome) {
    rollbar.error(`Unknown match outcome ${JSON.stringify({ match: currentMatch, tournamentId: id })}`);
  }

  if (outcome !== PlayerResult.not_finished) {
    return null;
  }

  const opponent = currentMatch.player1 === me.userid ? currentMatch.player2 : currentMatch.player1;

  return (
    <Card>
      <CardContent className="grid grid-cols-3 p-4">
        <PairingsRow
          match={{ ...currentMatch, player1: me.userid, player2: opponent }}
          tournament={tournament}
          round={myPod.rounds.length - 1}
        />
      </CardContent>
    </Card>
  );
}
