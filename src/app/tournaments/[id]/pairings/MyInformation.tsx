'use client';

import React from 'react';

import { Tournament } from '@/app/actions/tournament';
import { clientOnlyComponent } from '@/app/components/clientOnlyComponent';
import { useMyPokemonId } from '@/app/hooks';
import { InlinePokemonIdCheckForm } from '@/app/tournaments/[id]/pairings/InlinePokemonIdForm';
import { MyCurrentPairing } from '@/app/tournaments/[id]/pairings/MyCurrentPairing';
import { MyMatches } from '@/app/tournaments/[id]/pairings/MyMatches';

export const MyInformation = clientOnlyComponent<{ tournament: Tournament }>(
  ({ tournament }) => {
    const { myId } = useMyPokemonId();

    if (!myId) {
      return <InlinePokemonIdCheckForm />;
    }

    const { players, pods } = tournament;

    const me = players.find(player => player.userid === myId);

    if (!me) {
      console.log('me not found');
      return null;
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
