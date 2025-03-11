'use client';

import { useEffect, useRef } from 'react';

import { useMyPokemonId } from '@/app/hooks';

export function ImportLocalStorage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { myId, setMyId } = useMyPokemonId();

  const requestPokemonId = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'GET_POKEMON_ID',
        },
        'https://pokelocals-app.vercel.app'
      );
    }
  };

  // Listen for messages from the iframe
  useEffect(() => {
    if (myId) {
      return;
    }
    const handleMessage = (event: MessageEvent) => {
      // Verify the origin for security
      if (event.origin !== 'https://ptcg-pairings.netlify.app') return;

      if (event.data.type === 'POKEMON_ID_RESPONSE') {
        setMyId(event.data.pokemonId);
      }
    };

    window.addEventListener('message', handleMessage);
    requestPokemonId();
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
        sandbox="allow-scripts allow-same-origin"
        title="PTCG Pairings"
      />
    </div>
  );
}
