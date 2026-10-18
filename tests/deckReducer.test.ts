import assert from 'node:assert/strict';
import test from 'node:test';
import type { DeckCard } from '../src/@types/card.ts';
import { deckReducer, type DeckState } from '../src/reducer/deckReducer.ts';

const cards: DeckCard[] = [
  { id: '1', name: 'One', suit: 'spades', value: 'A', description: 'First', rarity: 'common' },
  { id: '2', name: 'Two', suit: 'hearts', value: 'K', description: 'Second', rarity: 'rare' },
  { id: '3', name: 'Three', suit: 'clubs', value: 'Q', description: 'Third', rarity: 'legendary' },
];

const createState = (): DeckState => ({ deck: [...cards], drawnCards: [], drawCount: 1 });

test('draws the configured number of cards without mutating state', () => {
  const state = { ...createState(), drawCount: 3 as const };
  const nextState = deckReducer(state, { type: 'DRAW_CARDS' });
  assert.deepEqual(nextState.deck, []);
  assert.deepEqual(nextState.drawnCards, cards);
  assert.deepEqual(state.deck, cards);
});

test('returns the existing state when the deck is empty', () => {
  const state = { ...createState(), deck: [] };
  assert.equal(deckReducer(state, { type: 'DRAW_CARDS' }), state);
});

test('resets using an already shuffled payload and clears drawn cards', () => {
  const state = { ...createState(), deck: [], drawnCards: cards };
  const shuffled = [...cards].reverse();
  const nextState = deckReducer(state, { type: 'RESET_DECK', payload: shuffled });
  assert.deepEqual(nextState.deck, shuffled);
  assert.deepEqual(nextState.drawnCards, []);
});
