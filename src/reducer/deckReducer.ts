import { DeckCard, DrawCountMode } from '../@types/card';
import { secureShuffle } from '../utils/cryptoRandom';

export type DeckState = {
  deck: DeckCard[];
  drawnCards: DeckCard[];
  drawCount: DrawCountMode;
  entropyLog: string;
};

export type DeckAction =
  | { type: 'INITIALIZE_DECK'; payload: DeckCard[] }
  | { type: 'DRAW_CARDS' }
  | { type: 'SET_DRAW_COUNT'; payload: DrawCountMode }
  | { type: 'SHUFFLE_DECK' }
  | { type: 'RESET_DECK' };

export function deckReducer(state: DeckState, action: DeckAction): DeckState {
  switch (action.type) {
    case 'INITIALIZE_DECK': {
      const { shuffled, entropyLog } = secureShuffle(action.payload);
      return {
        ...state,
        deck: shuffled,
        drawnCards: [],
        entropyLog,
      };
    }

    case 'DRAW_CARDS': {
      if (state.deck.length === 0) return state;

      const countToDraw = Math.min(state.drawCount, state.deck.length);
      const cardsToDraw = state.deck.slice(0, countToDraw);
      const remainingDeck = state.deck.slice(countToDraw);

      return {
        ...state,
        deck: remainingDeck,
        drawnCards: [...cardsToDraw, ...state.drawnCards],
      };
    }

    case 'SET_DRAW_COUNT': {
      return {
        ...state,
        drawCount: action.payload,
      };
    }

    case 'SHUFFLE_DECK': {
      const allCards = [...state.deck, ...state.drawnCards];
      const { shuffled, entropyLog } = secureShuffle(allCards);
      return {
        ...state,
        deck: shuffled,
        drawnCards: [],
        entropyLog,
      };
    }

    case 'RESET_DECK': {
      const allCards = [...state.deck, ...state.drawnCards];
      const { shuffled, entropyLog } = secureShuffle(allCards);
      return {
        ...state,
        deck: shuffled,
        drawnCards: [],
        entropyLog,
      };
    }

    default:
      return state;
  }
}
