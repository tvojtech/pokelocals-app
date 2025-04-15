'use client';

import { useRef, useState } from 'react';

import { useMyPokemonId } from '@/app/hooks';
import { clientOnlyComponent } from '@/components/clientOnlyComponent';

import { Button } from './ui/buttons/button';
import { Input } from './ui/input';

export const PokemonIdForm = clientOnlyComponent(() => {
  const { myId, setMyId } = useMyPokemonId();
  const [isDirty, setIsDirty] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    const newId = inputRef.current?.value;
    setMyId(newId);
    setIsDirty(false);
  };

  return (
    <form action={onSubmit} onReset={() => setIsDirty(false)} className="w-full space-y-2">
      <label className="block">My pokemon ID:</label>
      <Input
        type="text"
        defaultValue={myId}
        ref={inputRef}
        onChange={() => setIsDirty(true)}
        placeholder="Enter your Pokemon ID"
      />
      {isDirty && (
        <div className="flex items-center gap-2">
          <Button type="submit">Save</Button>
          <Button type="reset" variant="secondary">
            Cancel
          </Button>
        </div>
      )}
    </form>
  );
});
