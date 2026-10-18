import type { DeckCard, DrawCountMode } from '../@types/card';

export type DeckState = {
  deck: DeckCard[];
  drawnCards: DeckCard[];
  drawCount: DrawCountMode;
};

export type DeckAction =
  | { type: 'DRAW_CARDS' }
  | { type: 'SET_DRAW_COUNT'; payload: DrawCountMode }
  | { type: 'RESET_DECK'; payload: DeckCard[] };

export function deckReducer(state: DeckState, action: DeckAction): DeckState {
  switch (action.type) {
    case 'DRAW_CARDS': {
      if (state.deck.length === 0) return state;
      const countToDraw = Math.min(state.drawCount, state.deck.length);
      return {
        ...state,
        deck: state.deck.slice(countToDraw),
        drawnCards: [...state.deck.slice(0, countToDraw), ...state.drawnCards],
      };
    }
    case 'SET_DRAW_COUNT':
      if (state.drawCount === action.payload) return state;
      return { ...state, drawCount: action.payload };
    case 'RESET_DECK':
      return {
        ...state,
        deck: action.payload,
        drawnCards: [],
      };
  }
}
