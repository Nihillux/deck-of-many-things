import { Layers, RefreshCw, Sparkles } from 'lucide-react';
import type { DrawCountMode } from '../@types/card';
import styles from './DeckControls.module.css';

type DeckControlsProps = {
  cardsRemaining: number;
  drawCount: DrawCountMode;
  onDraw: () => void;
  onShuffle: () => void;
  onDrawCountChange: (count: DrawCountMode) => void;
};

const drawCountModes: DrawCountMode[] = [1, 3, 5];

export function DeckControls({ cardsRemaining, drawCount, onDraw, onShuffle, onDrawCountChange }: DeckControlsProps) {
  const isEmpty = cardsRemaining === 0;
  return (
    <aside className={styles.panel} aria-label="Deck controls">
      <button className={styles.deck} type="button" onClick={onDraw} disabled={isEmpty} aria-label={`Draw ${drawCount} ${drawCount === 1 ? 'card' : 'cards'}`}>
        <span className={styles.deckInset} aria-hidden="true" />
        <Sparkles size={32} aria-hidden="true" />
        <strong>Deck</strong>
        <small>{cardsRemaining} cards left</small>
        {!isEmpty && <span className={styles.drawHint}>Click to draw</span>}
      </button>

      <div className={styles.actions}>
        <button className={styles.primaryButton} type="button" onClick={onDraw} disabled={isEmpty}>
          <Layers size={16} aria-hidden="true" /> Draw {drawCount} {drawCount === 1 ? 'card' : 'cards'}
        </button>
        <button className={styles.secondaryButton} type="button" onClick={onShuffle}>
          <RefreshCw size={16} aria-hidden="true" /> Shuffle
        </button>
      </div>

      <fieldset className={styles.drawCount}>
        <legend>Draw count</legend>
        <div>
          {drawCountModes.map((mode) => (
            <button key={mode} type="button" aria-pressed={drawCount === mode} onClick={() => onDrawCountChange(mode)}>
              {mode} {mode === 1 ? 'card' : 'cards'}
            </button>
          ))}
        </div>
      </fieldset>
    </aside>
  );
}
