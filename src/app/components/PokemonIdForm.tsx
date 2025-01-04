'use client';

import { useIsClient } from '@uidotdev/usehooks';
import { Ban, Check, Edit } from 'lucide-react';
import { useRef, useState } from 'react';

import { useMyPokemonId } from '@/app/hooks';

export const PokemonIdForm: React.FC = () => {
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return <PokemonIdFormInternal />;
};

const PokemonIdFormInternal: React.FC = () => {
  const { myId, setMyId } = useMyPokemonId();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    const newId = inputRef.current?.value;
    setMyId(newId);
    setIsEditing(false);
  };

  return (
    <form
      action={onSubmit}
      onReset={() => setIsEditing(false)}
      className="space-y-2 w-full">
      <label className="block">My pokemon ID:</label>
      <div className="flex gap-3 px-4">
        <input
          type="text"
          defaultValue={myId}
          ref={inputRef}
          placeholder="Enter your Pokemon ID"
          disabled={!isEditing}
          readOnly={!isEditing}
          className="outline-2 border border-slate-300 p-1 px-2 text-black disabled:bg-slate-100 flex-grow"
        />
        {isEditing ? (
          <>
            <button type="submit">
              <Check size={24} className="text-green-700" />
            </button>
            <button type="reset">
              <Ban size={24} className="text-red-500" />
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)}>
            <Edit size={24} className="text-yellow-400" />
          </button>
        )}
      </div>
    </form>
  );
};
