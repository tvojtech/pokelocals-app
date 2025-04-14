'use client';

import { useRef } from 'react';

import { useMyPokemonId } from '@/app/hooks';
import { clientOnlyComponent } from '@/components/clientOnlyComponent';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/buttons/button';
import { Input } from '@/components/ui/input';

export const InlinePokemonIdCheckForm = clientOnlyComponent(() => {
  const { myId, setMyId } = useMyPokemonId();
  const inputRef = useRef<HTMLInputElement>(null);
  const isNewDomain =
    window.location.hostname.includes('pokelocals.online') || window.location.hostname.includes('localhost');

  const onSubmit = () => {
    setMyId(inputRef.current?.value);
  };

  if (myId) {
    return null;
  }

  return (
    <form action={onSubmit} className="space-y-2">
      <Alert variant="info">
        <AlertDescription>
          <p>Enter your Pokemon ID to see your pairings.</p>
          {isNewDomain && (
            <>
              <p>&nbsp;</p>
              <p>You may have filled this before, but due to the domain change, it must be re-entered.</p>
              <p>&nbsp;</p>
              <p>We apologize for the inconvenience.</p>
            </>
          )}
        </AlertDescription>
      </Alert>
      <Input ref={inputRef} type="text" defaultValue={myId} placeholder="Enter your Pokemon ID" />
      <Button type="submit" className="w-full">
        Save your ID
      </Button>
    </form>
  );
});
