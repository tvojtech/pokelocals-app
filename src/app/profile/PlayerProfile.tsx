'use client';

import { useUser } from '@clerk/nextjs';

import { Loading } from '@/components/Loading';
import { PokemonIdForm } from '@/components/PokemonIdForm';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { PlayerProfileForm } from './PlayerProfileForm';

export function PlayerProfile() {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div className="space-y-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Local player profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="info">
            <AlertDescription>
              Pokémon ID is stored in your browser, it will not be available when you switch devices.
            </AlertDescription>
          </Alert>
          <div className="w-full">
            <PokemonIdForm />
          </div>
        </CardContent>
      </Card>
      {user && (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Player profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="info">
              <AlertDescription>
                <p>
                  We need this information for decklist submission. If you don&apos;t want to submit decklist via POKÉ
                  LOCALS, you can leave it blank.
                </p>
                <p>
                  These information have precedence over the information in your Local player profile and will be used
                  throughout the whole application.
                </p>
              </AlertDescription>
            </Alert>
            <PlayerProfileForm />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
