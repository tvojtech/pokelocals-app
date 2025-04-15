'use client';

import { useState } from 'react';

import { useMyPokemonId } from '@/app/hooks';
import { clientOnlyComponent } from '@/components/clientOnlyComponent';

import { Button } from './ui/buttons/button';
import { Input } from './ui/input';

export const PokemonIdForm = clientOnlyComponent(() => {
  const { myId, setMyId } = useMyPokemonId();
  const [value, setValue] = useState(myId);

  const onSubmit = () => {
    setMyId(value);
  };

  return (
    <form action={onSubmit} onReset={() => setValue(myId)} className="w-full space-y-2">
      <label className="block">My pokemon ID:</label>
      <Input
        type="text"
        value={value ?? ''}
        onChange={evt => setValue(evt.target.value)}
        placeholder="Enter your Pokemon ID"
      />
      {value !== myId && (
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
