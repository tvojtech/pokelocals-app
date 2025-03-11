'use client';

import { useEffect, useRef } from 'react';

import { clientOnlyComponent } from '@/app/components/clientOnlyComponent';
import { useMyPokemonId } from '@/app/hooks';

export function ImportLocalStorageInternal() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { myId, setMyId } = useMyPokemonId();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'GET_POKEMON_ID') {
        if (
          event.origin.includes('pokelocals-app.vercel.app') &&
          event.origin.includes('localhost') &&
          event.origin.includes('app.pokelocals.online')
        ) {
          return;
        }

        if (!myId) {
          return;
        }

        event.source?.postMessage(
          { type: 'POKEMON_ID_RESPONSE', pokemonId: myId },
          { targetOrigin: event.origin }
        );
      }

      if (event.data.type === 'POKEMON_ID_RESPONSE') {
        if (event.origin !== 'https://ptcg-pairings.netlify.app') return;
        setMyId(event.data.pokemonId);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (myId) {
    return null;
  }

  return (
    <div className="relative hidden">
      <iframe
        ref={iframeRef}
        src="https://ptcg-pairings.netlify.app"
        className="w-full h-full border-0"
        // sandbox="allow-scripts allow-same-origin"
        title="PTCG Pairings"
        onLoad={evt => {
          evt.currentTarget.contentWindow?.postMessage(
            { type: 'GET_POKEMON_ID' },
            'https://ptcg-pairings.netlify.app'
          );
        }}
      />
    </div>
  );
}

const ClientOnlyImportLocalStorage = clientOnlyComponent(
  ImportLocalStorageInternal
);

export { ClientOnlyImportLocalStorage as ImportLocalStorage };
