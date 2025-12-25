export type Result<T, E = string> = { ok: true; value: T } | { ok: false; error: E };

type DeckCard = {
  count: number;
  name: string;
  set?: string;
  setNumber?: string;
};

export interface ParsedDecklist {
  cards: DeckCard[];
}

export function parseDecklist(decklist?: string): Result<ParsedDecklist, string> {
  try {
    if (!decklist || decklist.trim().length === 0) {
      return { ok: true, value: { cards: [] } };
    }

    const lines = decklist.split('\n').map(line => line.trim());

    const cards: DeckCard[] = [];

    for (const line of lines) {
      const card = parseCardLine(line);
      if (card) {
        cards.push(card);
      }
    }

    return { ok: true, value: { cards } };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Invalid decklist' };
  }
}

const SET_ALIAS_MAP: Record<string, string> = {
  'PR-SV': 'SVP',
};

export function parseCardLine(line: string): DeckCard | null {
  if (line.trim().length === 0) {
    return null;
  }

  // Match lines like
  // 4 Pikachu Ex SVI 25
  // 4x Pikachu Ex SVI 25
  // 4 Pikachu Ex
  // 4x Pikachu Ex
  const fullCardLineRegexp = /^\s*(\d{1,2})x?\s+(.*?)(\s+([a-zA-Z-]*)\s+(\d{1,3})(\s+PH)?)?\s*$/;
  const fullCardLineMatch = line.trim().match(fullCardLineRegexp);
  if (fullCardLineMatch) {
    const [, parsedCount, parsedName, , parsedSet, parsedSetNumber] = fullCardLineMatch;
    const count = parseInt(parsedCount, 10);
    const name = parsedName.trim();
    const set = parsedSet ? parsedSet : undefined;
    const setNumber = parsedSetNumber ? parsedSetNumber : undefined;

    const energyRegexp = /^\s*.*\{([A-Za-z])\} Energy\s*$/;
    const energyMatch = name.match(energyRegexp);
    if (energyMatch && set === 'Energy') {
      const energyType = energyMatch[1];
      return { count, name, set: 'SUM', setNumber: energyType };
    }

    const normalizedSet = set ? (SET_ALIAS_MAP[set] ?? set) : undefined;

    return { count, name, set: normalizedSet, setNumber: setNumber?.padStart(3, '0') };
  }

  return null;
}

export function getCardKey(card: { name: string; count: number; set?: string; setNumber?: string }) {
  return `${card.name}-${card.count}-${card.set ?? ''}-${card.setNumber ?? ''}`;
}
