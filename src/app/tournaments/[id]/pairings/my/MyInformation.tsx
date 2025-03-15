'use client';

import { Tournament } from '@/app/actions/tournament';
import { Alert } from '@/app/components/Alert';
import { clientOnlyComponent } from '@/app/components/clientOnlyComponent';
import { useMyPokemonId } from '@/app/hooks';
import { InlinePokemonIdCheckForm } from '@/app/tournaments/[id]/pairings/InlinePokemonIdForm';
import { MyCurrentPairing } from '@/app/tournaments/[id]/pairings/my/MyCurrentPairing';
import { MyMatches } from '@/app/tournaments/[id]/pairings/my/MyMatches';
import { guessFullName } from '@/app/utils';

export const MyInformation = clientOnlyComponent<{ tournament: Tournament }>(
  ({ tournament }) => {
    const { myId } = useMyPokemonId();

    if (!myId) {
      return <InlinePokemonIdCheckForm />;
    }

    const { players, pods } = tournament;

    const me = players[myId];

    if (!me) {
      console.log('me not found');
      return (
        <Alert
          type="error"
          title="You are not registered in the tournament!"
          message={`Is your Pokemon ID correct? (ID: ${myId})`}
        />
      );
    }

    if (!pods || pods.length === 0) {
      return (
        <>
          <Alert
            type="info"
            title="You are registered in the tournament."
            message={`Your Pokemon ID: ${myId}. Your name: ${guessFullName(me)}`}
          />
          <Alert type="warning" message="Pairings not published yet." />
        </>
      );
    }

    const myPod = pods.find(pod =>
      pod.subgroups.some(subgroup => subgroup.players.includes(me.userid))
    );

    if (!myPod) {
      console.log('myPod not found');
      return null;
    }

    return (
      <>
        <MyCurrentPairing me={me} pod={myPod} tournament={tournament} />
        <MyMatches me={me} pod={myPod} tournament={tournament} />
      </>
    );
  }
);
