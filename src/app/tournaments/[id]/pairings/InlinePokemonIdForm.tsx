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
        </AlertDescription>
      </Alert>
      <Input ref={inputRef} type="text" defaultValue={myId} placeholder="Enter your Pokemon ID" />
      <Button type="submit" className="w-full">
        Save your ID
      </Button>
    </form>
  );
});
