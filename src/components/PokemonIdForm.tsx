'use client';

import { Ban, Check, Edit } from 'lucide-react';
import { useRef, useState } from 'react';

import { useMyPokemonId } from '@/app/hooks';
import { clientOnlyComponent } from '@/components/clientOnlyComponent';

export const PokemonIdForm = clientOnlyComponent(() => {
  const { myId, setMyId } = useMyPokemonId();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    const newId = inputRef.current?.value;
    setMyId(newId);
    setIsEditing(false);
  };

  return (
    <form action={onSubmit} onReset={() => setIsEditing(false)} className="w-full space-y-2">
      <label className="block">My pokemon ID:</label>
      <div className="flex gap-3">
        <input
          type="text"
          defaultValue={myId}
          ref={inputRef}
          placeholder="Enter your Pokemon ID"
          disabled={!isEditing}
          readOnly={!isEditing}
          className="flex-grow border border-slate-300 p-1 px-2 text-black outline-2 disabled:bg-slate-100"
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
          <button
            type="button"
            onClick={() => {
              setIsEditing(true);
              setTimeout(() => {
                inputRef.current?.focus();
              }, 0);
            }}>
            <Edit size={24} className="text-yellow-400" />
          </button>
        )}
      </div>
    </form>
  );
});
