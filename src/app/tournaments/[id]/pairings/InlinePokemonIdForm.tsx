'use client';

import { useRef } from 'react';

import { Alert } from '@/app/components/Alert';
import { clientOnlyComponent } from '@/app/components/clientOnlyComponent';
import { useMyPokemonId } from '@/app/hooks';
import { Button } from '@/components/ui/button';
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
      <Alert type="info" message="Set your Pokemon ID to see your pairings." />
      <Input
        ref={inputRef}
        type="text"
        defaultValue={myId}
        placeholder="Enter your Pokemon ID"
      />
      <Button type="submit" className="w-full">
        Save your ID
      </Button>
    </form>
  );
});
