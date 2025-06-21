export interface ParsedDecklist {
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

export function parseDecklist(decklist?: string): ParsedDecklist | { error: string } {
  try {
    if (!decklist || decklist.trim().length === 0) {
      return { pokemonTotal: 0, trainerTotal: 0, energyTotal: 0, pokemon: [], trainer: [], energy: [] };
    }

    const lines = decklist.split('\n').map(line => line.trim());

    const pokemon: ParsedDecklist['pokemon'] = [];
    const trainer: ParsedDecklist['trainer'] = [];
    const energy: ParsedDecklist['energy'] = [];

    let currentSection: 'pokemon' | 'trainer' | 'energy' | null = null;
    let pokemonCount = 0;
    let trainerCount = 0;
    let energyCount = 0;

    for (const line of lines) {
      // Skip empty lines
      if (line.length === 0) {
        continue;
      }

      // Check for section headers
      if (line.startsWith('Pokémon:')) {
        currentSection = 'pokemon';
        pokemonCount = parseInt(line.split(':')[1].trim(), 10) || 0;
        continue;
      }

      if (line.startsWith('Trainer:')) {
        currentSection = 'trainer';
        trainerCount = parseInt(line.split(':')[1].trim(), 10) || 0;
        continue;
      }

      if (line.startsWith('Energy:')) {
        currentSection = 'energy';
        energyCount = parseInt(line.split(':')[1].trim(), 10) || 0;
        continue;
      }

      // Parse card lines based on current section
      if (currentSection && line.match(/^\d+\s+/)) {
        const parts = line.split(' ');
        const count = parseInt(parts[0], 10);

        // Extract set and set number (last two parts)
        const set = parts[parts.length - 2];
        const setNumber = parts[parts.length - 1];

        // Extract card name (everything between count and set info)
        const nameParts = parts.slice(1, parts.length - 2);
        const name = nameParts.join(' ');

        if (currentSection === 'pokemon') {
          pokemon.push({
            name,
            count,
            set,
            setNumber,
          });
        } else if (currentSection === 'trainer') {
          trainer.push({
            name,
            count,
            set,
            setNumber,
          });
        } else if (currentSection === 'energy') {
          energy.push({
            name,
            count,
            set,
            setNumber,
          });
        }
      }
    }

    return {
      pokemonTotal: pokemonCount,
      trainerTotal: trainerCount,
      energyTotal: energyCount,
      pokemon,
      trainer,
      energy,
    };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Invalid decklist' };
  }
}

export function validateDecklist(decklist?: ParsedDecklist) {
  if (!decklist) {
    return [];
  }

  let errors: string[] = [];

  const { pokemon, trainer, energy, pokemonTotal, trainerTotal, energyTotal } = decklist;

  if (pokemonTotal + trainerTotal + energyTotal !== 60) {
    errors = [...errors, 'Total number of cards must be 60.'];
  }

  if (pokemon.reduce((acc, p) => acc + p.count, 0) !== pokemonTotal) {
    errors = [...errors, 'Number of Pokémon cards does not match the total number of cards in the decklist.'];
  }

  if (trainer.reduce((acc, t) => acc + t.count, 0) !== trainerTotal) {
    errors = [...errors, 'Number of Trainer cards does not match the total number of cards in the decklist.'];
  }

  if (energy.reduce((acc, e) => acc + e.count, 0) !== energyTotal) {
    errors = [...errors, 'Number of Energy cards does not match the total number of cards in the decklist.'];
  }

  if (pokemon.some(p => p.count > 4)) {
    errors = [...errors, 'Pokémon cards cannot have more than 4 copies.'];
  }

  if (trainer.some(t => t.count > 4)) {
    errors = [...errors, 'Trainer cards cannot have more than 4 copies.'];
  }

  return errors;
}

export function parseCardLine(line: string) {
  if (!line.match(/^\d+\s+/)) {
    return null;
  }

  const parts = line.split(' ');
  const count = parseInt(parts[0], 10);
  const set = parts[parts.length - 2];
  const setNumber = parts[parts.length - 1];
  const name = parts.slice(1, parts.length - 2).join(' ');

  return { name, count, set, setNumber };
}

export function getCardKey(card: { name: string; count: number; set?: string; setNumber?: string }) {
  return `${card.name}-${card.count}-${card.set ?? ''}-${card.setNumber ?? ''}`;
}
