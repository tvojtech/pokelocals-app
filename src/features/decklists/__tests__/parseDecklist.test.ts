import { describe } from 'node:test';

import { assert, it, vi } from 'vitest';

import { parseDecklist } from '../utils';
import testDecks from './data/decks';

vi.mock('server-only', () => {
  return {
    // mock server-only module
  };
});

vi.mock('postgres', () => {
  return { default: () => {} };
});

function cardToString(card: { count: number; name: string; set?: string; setNumber?: string }) {
  return `${card.count}|${card.name}|${card.set}|${card.setNumber}`;
}

describe('parseDecklist', () => {
  testDecks.forEach(testDeck => {
    it(`should parse deck: ${testDeck.desc}`, () => {
      const result = parseDecklist(testDeck.deckList);

      if (!result.ok) {
        assert.fail(`Parsing failed with error: ${result.error}`);
      }

      if (result.value.cards.length !== testDeck.data.length) {
        assert.fail(`Expected ${testDeck.data.length} cards, but got ${result.value.cards.length}`);
      }

      const expectedCardSet = new Set(testDeck.data.map(c => cardToString(c)));

      result.value.cards.forEach(card => {
        const realCardKey = cardToString(card);

        if (!expectedCardSet.has(realCardKey)) {
          assert.fail(`Unexpected card found: ${card.count} ${card.name} ${card.set} ${card.setNumber}`);
        }

        expectedCardSet.delete(realCardKey);
      });

      if (expectedCardSet.size > 0) {
        const missingCards = Array.from(expectedCardSet).join(', ');
        assert.fail(`Expected cards not found: ${missingCards}`);
      }
    });
  });
});
