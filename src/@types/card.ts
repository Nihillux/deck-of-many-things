export type CardSuit = 'spades' | 'hearts' | 'diamonds' | 'clubs';

export interface DeckCard {
  id: string;
  name: string;
  suit: CardSuit;
  value: string;
  description: string;
  rarity: 'common' | 'rare' | 'legendary';
}

export type DrawCountMode = 1 | 3 | 5;
