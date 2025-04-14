'use client';

import { Tournament } from '@/actions/tournament';
import { useMyPokemonId } from '@/app/hooks';
import { InlinePokemonIdCheckForm } from '@/app/tournaments/[id]/pairings/InlinePokemonIdForm';
import { MyCurrentPairing } from '@/app/tournaments/[id]/pairings/my/MyCurrentPairing';
import { MyMatches } from '@/app/tournaments/[id]/pairings/my/MyMatches';
import { guessFullName } from '@/app/utils';
import { clientOnlyComponent } from '@/components/clientOnlyComponent';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const MyInformation = clientOnlyComponent<{ tournament: Tournament }>(({ tournament }) => {
  const { myId } = useMyPokemonId();

  if (!myId) {
    return <InlinePokemonIdCheckForm />;
  }

  const { players, pods } = tournament;

  const me = players[myId];

  if (!me) {
    console.log('me not found');
    return (
      <Alert variant="destructive">
        <AlertTitle>You are not registered in the tournament!</AlertTitle>
        <AlertDescription>Is your Pokemon ID correct? (ID: {myId})</AlertDescription>
      </Alert>
    );
  }

  if (!pods || pods.length === 0) {
    return (
      <>
        <Alert variant="info">
          <AlertTitle>You are registered in the tournament.</AlertTitle>
          <AlertDescription>
            Your Pokemon ID: {myId}. Your name: {guessFullName(me)}
          </AlertDescription>
        </Alert>
        <Alert variant="warning">
          <AlertDescription>Pairings not published yet.</AlertDescription>
        </Alert>
      </>
    );
  }

  const myPod = pods.find(pod => pod.subgroups.some(subgroup => subgroup.players.includes(me.userid)));

  if (!myPod) {
    console.log('myPod not found');
    return null;
  }

  return (
    <div className="space-y-6">
      <MyCurrentPairing me={me} pod={myPod} tournament={tournament} />
      <MyMatches me={me} pod={myPod} tournament={tournament} />
    </div>
  );
});
