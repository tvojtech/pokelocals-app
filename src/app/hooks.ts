import { useIsClient, useLocalStorage } from "@uidotdev/usehooks";

export const useMyPokemonId = () => {
  const [myId, setMyId] = useLocalStorage<string | undefined>("myPokemonId");

  return { myId, setMyId };
};

export const useWindowLocation = () => {
  const isClient = useIsClient();
  if (!isClient) {
    return undefined;
  }
  return window.location;
};
