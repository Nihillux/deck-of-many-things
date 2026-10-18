import { useReducer } from 'react';
import { Sparkles } from 'lucide-react';
import type { DrawCountMode } from './@types/card';
import { DeckControls } from './components/DeckControls';
import { DrawnCard } from './components/DrawnCard';
import { initialDeckData } from './data/initialDeck';
import { deckReducer, type DeckState } from './reducer/deckReducer';
import { secureShuffle } from './utils/cryptoRandom';
import styles from './App.module.css';

const initialState: DeckState = {
  deck: secureShuffle(initialDeckData),
  drawnCards: [],
  drawCount: 1,
};

export default function App() {
  const [state, dispatch] = useReducer(deckReducer, initialState);

  const handleShuffle = () => {
    const shuffledDeck = secureShuffle([...state.deck, ...state.drawnCards]);
    dispatch({ type: 'RESET_DECK', payload: shuffledDeck });
  };

  const handleDrawCountChange = (drawCount: DrawCountMode) => {
    dispatch({ type: 'SET_DRAW_COUNT', payload: drawCount });
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.brandIcon} aria-hidden="true"><Sparkles size={24} /></span>
          <div>
            <h1>The Deck of Many Things</h1>
            <p>by Nihillux</p>
          </div>
        </div>
      </header>

      <main className={styles.layout}>
        <DeckControls
          cardsRemaining={state.deck.length}
          drawCount={state.drawCount}
          onDraw={() => dispatch({ type: 'DRAW_CARDS' })}
          onShuffle={handleShuffle}
          onDrawCountChange={handleDrawCountChange}
        />

        <section className={styles.table} aria-labelledby="drawn-cards-heading">
          <div className={styles.tableHeading}>
            <h2 id="drawn-cards-heading">Tabletop Drawn Cards <span>{state.drawnCards.length} revealed</span></h2>
            {state.drawnCards.length > 0 && <button type="button" onClick={handleShuffle}>Gather all &amp; reset deck</button>}
          </div>
          {state.drawnCards.length === 0 ? (
            <div className={styles.emptyTable}>
              <span className={styles.emptyIcon} aria-hidden="true">?</span>
              <p>The table is currently empty.</p>
              <small>Choose the number of cards, then draw to reveal what the deck holds.</small>
            </div>
          ) : (
            <div className={styles.cardGrid} aria-live="polite">
              {state.drawnCards.map((card) => <DrawnCard key={card.id} card={card} />)}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
