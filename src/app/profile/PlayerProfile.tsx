'use client';

import { Loading } from '@/components/Loading';
import { PokemonIdForm } from '@/components/PokemonIdForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserProfile } from '@/features/profile/hooks/useUserProfile';

import { PlayerProfileForm } from './PlayerProfileForm';

export function PlayerProfile() {
  const { isLoaded, user } = useUserProfile();

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div className="space-y-4">
      {!user ? (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Player profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="w-full">
              <PokemonIdForm />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Player profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <PlayerProfileForm />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
