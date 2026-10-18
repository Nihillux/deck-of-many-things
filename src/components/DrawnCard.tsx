import type { CardSuit, DeckCard } from '../@types/card';
import styles from './DrawnCard.module.css';

const suitSymbols: Record<CardSuit, string> = { spades: '♠', hearts: '♥', diamonds: '♦', clubs: '♣' };

export function DrawnCard({ card }: { card: DeckCard }) {
  const isRedSuit = card.suit === 'hearts' || card.suit === 'diamonds';
  return (
    <article className={styles.card}>
      <div>
        <div className={styles.cardHeader}>
          <span className={isRedSuit ? styles.redSuit : styles.blackSuit} aria-label={`${card.value} of ${card.suit}`}>
            <span aria-hidden="true">{suitSymbols[card.suit]} {card.value}</span>
          </span>
          <span className={`${styles.rarity} ${styles[card.rarity]}`}>{card.rarity}</span>
        </div>
        <h3>{card.name}</h3>
        <p>{card.description}</p>
      </div>
      <footer><span>Suit: {card.suit}</span><span>ID: {card.id}</span></footer>
    </article>
  );
}
