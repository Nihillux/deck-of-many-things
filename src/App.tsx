import React, { useReducer, useEffect, useState } from 'react';
import { deckReducer, DeckState } from './reducer/deckReducer';
import { initialDeckData } from './data/initialDeck';
import { DrawCountMode } from './@types/card';
import { Sparkles, RefreshCw, Layers, ShieldCheck, HelpCircle, Terminal } from 'lucide-react';

const initialState: DeckState = {
  deck: [],
  drawnCards: [],
  drawCount: 1,
  entropyLog: 'Initializing cryptographic entropy...',
};

export default function App() {
  const [state, dispatch] = useReducer(deckReducer, initialState);
  const [showEntropyModal, setShowEntropyModal] = useState(false);

  useEffect(() => {
    dispatch({ type: 'INITIALIZE_DECK', payload: initialDeckData });
  }, []);

  const handleDraw = () => {
    dispatch({ type: 'DRAW_CARDS' });
  };

  const handleShuffle = () => {
    dispatch({ type: 'SHUFFLE_DECK' });
  };

  const handleDrawCountChange = (count: DrawCountMode) => {
    dispatch({ type: 'SET_DRAW_COUNT', payload: count });
  };

  const getSuitSymbol = (suit: string) => {
    switch (suit) {
      case 'spades': return '♠';
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      default: return '•';
    }
  };

  const getSuitColor = (suit: string) => {
    return suit === 'hearts' || suit === 'diamonds' ? 'text-red-500' : 'text-slate-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              The Deck of Many Things
              <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                React + TS + Web Crypto
              </span>
            </h1>
            <p className="text-xs text-slate-400">Provably Fair Mathematical Randomness Sandbox</p>
          </div>
        </div>

        <button
          onClick={() => setShowEntropyModal(true)}
          className="flex items-center gap-2 text-xs font-medium px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Crypto Inspector
        </button>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col items-center text-center">
            <div 
              onClick={handleDraw}
              className={`relative w-40 h-56 bg-gradient-to-tr from-indigo-950 via-purple-900 to-slate-900 border-2 border-indigo-500/40 rounded-xl shadow-2xl flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 hover:border-indigo-400 active:scale-95 group ${
                state.deck.length === 0 ? 'opacity-40 pointer-events-none' : ''
              }`}
            >
              <div className="absolute inset-2 border border-indigo-500/20 rounded-lg pointer-events-none"></div>
              <Sparkles className="w-8 h-8 text-indigo-400 mb-2 group-hover:animate-pulse" />
              <span className="text-sm font-bold tracking-widest text-indigo-200 uppercase">Deck</span>
              <span className="text-xs text-indigo-400/80 mt-1">{state.deck.length} Cards Left</span>

              {state.deck.length > 0 && (
                <div className="absolute -bottom-3 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                  Click to Draw
                </div>
              )}
            </div>

            <div className="w-full mt-8 flex flex-col gap-3">
              <button
                onClick={handleDraw}
                disabled={state.deck.length === 0}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4" />
                Draw {state.drawCount} {state.drawCount === 1 ? 'Card' : 'Cards'}
              </button>

              <button
                onClick={handleShuffle}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl border border-slate-700 transition flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Secure Shuffle
              </button>
            </div>

            <div className="w-full mt-6 pt-6 border-t border-slate-800">
              <span className="text-xs font-medium text-slate-400 block mb-3">Draw Count Mode:</span>
              <div className="grid grid-cols-3 gap-2">
                {([1, 3, 5] as DrawCountMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => handleDrawCountChange(mode)}
                    className={`py-1.5 text-xs font-bold rounded-lg border transition ${
                      state.drawCount === mode
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {mode} {mode === 1 ? 'Card' : 'Cards'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
              Tabletop Drawn Cards
              <span className="text-xs px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full">
                {state.drawnCards.length} Revealed
              </span>
            </h2>
            {state.drawnCards.length > 0 && (
              <button
                onClick={handleShuffle}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline underline-offset-4"
              >
                Gather All & Reset Deck
              </button>
            )}
          </div>

          {state.drawnCards.length === 0 ? (
            <div className="flex-1 min-h-[400px] border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center p-8 bg-slate-900/30">
              <HelpCircle className="w-12 h-12 text-slate-600 mb-3" />
              <p className="text-slate-300 font-medium">The table is currently empty.</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Click the deck pile on the left or hit "Draw Cards" to reveal the mystical secrets held within.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {state.drawnCards.map((card, index) => (
                <div
                  key={`${card.id}-${index}`}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-indigo-500/50 transition animate-fade-in"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition"></div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-2xl font-black ${getSuitColor(card.suit)}`}>
                        {getSuitSymbol(card.suit)} {card.value}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        card.rarity === 'legendary' 
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                          : card.rarity === 'rare' 
                          ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' 
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {card.rarity}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1">{card.name}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{card.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Suit: {card.suit}</span>
                    <span>ID: {card.id}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {showEntropyModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Cryptographic Entropy Inspector</h3>
                <p className="text-xs text-slate-400">Verifiable Hardware Randomness Log</p>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-emerald-400 mb-6 overflow-x-auto max-h-40">
              {state.entropyLog}
            </div>

            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Unlike standard pseudo-random functions like <code className="text-slate-200">Math.random()</code>, this app invokes <code className="text-slate-200">window.crypto.getRandomValues()</code> for hardware-backed secure entropy.
            </p>

            <button
              onClick={() => setShowEntropyModal(false)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition"
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
