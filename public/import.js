(() => {
  console.log('Running import script');
  window.addEventListener('message', event => {
    // Verify the origin of the message for security
    if (
      event.origin.includes('pokelocals-app.vercel.app') &&
      event.origin.includes('localhost') &&
      event.origin.includes('app.pokelocals.online')
    )
      return;

    if (event.data.type === 'GET_POKEMON_ID') {
      try {
        const pokemonId = localStorage.getItem('myPokemonId');
        event.source.postMessage(
          {
            type: 'POKEMON_ID_RESPONSE',
            pokemonId: pokemonId,
          },
          event.origin
        );
      } catch (error) {
        event.source.postMessage(
          {
            error: 'Failed to access localStorage: ' + error.message,
          },
          event.origin
        );
      }
    }
  });
})();
