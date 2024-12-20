import { useLocalStorage } from "@uidotdev/usehooks";

export const useMyPokemonId = () => {
  const [myId, setMyId] = useLocalStorage<string | undefined>("myPokemonId");

  return { myId, setMyId };
};
