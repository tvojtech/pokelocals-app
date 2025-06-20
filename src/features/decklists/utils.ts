interface ParsedDecklist {
  pokemonTotal: number;
  trainerTotal: number;
  energyTotal: number;
  pokemon: {
    name: string;
    count: number;
    set: string;
    setNumber: string;
  }[];
  trainer: {
    name: string;
    count: number;
    set?: string;
    setNumber?: string;
  }[];
  energy: {
    name: string;
    count: number;
    set?: string;
    setNumber?: string;
  }[];
}

export function parseDecklist(decklist?: string): ParsedDecklist {
  if (!decklist || decklist.trim().length === 0) {
    return { pokemonTotal: 0, trainerTotal: 0, energyTotal: 0, pokemon: [], trainer: [], energy: [] };
  }

  const lines = decklist.split('\n').map(line => line.trim());

  const pokemonTotal = 0,
    trainerTotal = 0,
    energyTotal = 0;
  const pokemon: ParsedDecklist['pokemon'] = [],
    trainer: ParsedDecklist['trainer'] = [],
    energy: ParsedDecklist['energy'] = [];

  return { pokemonTotal, trainerTotal, energyTotal, pokemon: [], trainer: [], energy: [] };
}
