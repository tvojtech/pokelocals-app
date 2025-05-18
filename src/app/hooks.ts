import { useIsClient, useLocalStorage } from '@uidotdev/usehooks';

export function useMyPokemonId() {
  const [myId, setMyId] = useLocalStorage<string | undefined>('myPokemonId');

  return { myId, setMyId };
}

export function useOrganizerAlertDismissed() {
  const [dismissed, setDismissed] = useLocalStorage<boolean>('organizerAlertDismissed', false);

  return { dismissed, setDismissed };
}

export function useWindowLocation() {
  const isClient = useIsClient();
  if (!isClient) {
    return undefined;
  }
  return window.location;
}
