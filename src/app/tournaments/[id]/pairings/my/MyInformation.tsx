'use client';

import { Tournament } from '@/actions/tournament';
import { useMyPokemonId } from '@/app/hooks';
import { InlinePokemonIdCheckForm } from '@/app/tournaments/[id]/pairings/InlinePokemonIdForm';
import { MyCurrentPairing } from '@/app/tournaments/[id]/pairings/my/MyCurrentPairing';
import { PlayerMatches } from '@/app/tournaments/[id]/pairings/my/PlayerMatches';
import { guessFullName } from '@/app/utils';
import { clientOnlyComponent } from '@/components/clientOnlyComponent';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useUserProfile } from '@/features/profile/hooks/useUserProfile';

export const MyInformation = clientOnlyComponent<{ tournament: Tournament }>(({ tournament }) => {
  const { profile, isLoaded } = useUserProfile();
  let { myId } = useMyPokemonId();

  if (!isLoaded) {
    return null;
  }

  if (profile?.pokemonId) {
    myId = profile.pokemonId;
  }

  if (!myId) {
    return <InlinePokemonIdCheckForm />;
  }

  const { players, pods } = tournament;

  const me = players[myId];

  if (!me) {
    return (
      <Alert variant="destructive">
        <AlertTitle>You are not registered in the tournament!</AlertTitle>
        <AlertDescription>Is your Pokémon ID correct? (ID: {myId})</AlertDescription>
      </Alert>
    );
  }

  if (!pods || pods.length === 0 || pods.every(pod => pod.rounds.length === 0)) {
    return (
      <div className="space-y-2">
        <Alert variant="info">
          <AlertTitle>You are registered in the tournament.</AlertTitle>
          <AlertDescription>
            Your Pokémon ID: {myId}. Your name: {guessFullName(me)}
          </AlertDescription>
        </Alert>
        <Alert variant="warning">
          <AlertDescription>Pairings not published yet.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const myPod = pods.find(pod => pod.subgroups.some(subgroup => subgroup.players.includes(me.userid)));

  if (!myPod) {
    console.log('myPod not found');
    return null;
  }

  return (
    <div className="space-y-4">
      <MyCurrentPairing me={me} pod={myPod} tournament={tournament} />
      <PlayerMatches player={me} pod={myPod} tournament={tournament} anonymize={false} />
    </div>
  );
});
