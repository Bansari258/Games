import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const MemoryGame = () => {
  const navigate = useNavigate();
  const emojis = ['🐱', '🐶', '🐰', '🦁', '🐻', '🦊', '🐼', '🐯'];

  const initialCards = useMemo(() => 
    [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, flipped: false, matched: false })),
    []
  );

  const [cards, setCards] = useState(initialCards);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matches, setMatches] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleCardClick = useCallback((index) => {
    if (gameOver || cards[index].flipped || cards[index].matched || flippedCards.length === 2) return;

    setCards(prev => {
      const newCards = [...prev];
      newCards[index].flipped = true;
      return newCards;
    });

    const newFlippedCard = { index, emoji: cards[index].emoji };
    setFlippedCards(prev => [...prev, newFlippedCard]);

    if (flippedCards.length === 1) {
      const [firstCard] = flippedCards;
      if (firstCard.emoji === newFlippedCard.emoji) {
        setCards(prev => {
          const newCards = [...prev];
          newCards[firstCard.index].matched = true;
          newCards[newFlippedCard.index].matched = true;
          return newCards;
        });
        setMatches(prev => {
          const newMatches = prev + 1;
          if (newMatches === emojis.length) setGameOver(true);
          return newMatches;
        });
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(prev => {
            const newCards = [...prev];
            newCards[firstCard.index].flipped = false;
            newCards[newFlippedCard.index].flipped = false;
            return newCards;
          });
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [cards, flippedCards, gameOver]);

  const resetGame = useCallback(() => {
    setCards([...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, flipped: false, matched: false }))
    );
    setFlippedCards([]);
    setMatches(0);
    setGameOver(false);
  }, []);

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="text-text-white hover:text-neon-purple font-orbitron font-medium text-sm transition duration-300 m-5 absolute"
      >
        &#8592; Back
      </button>
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center">
          <h1 className="text-4xl text-neon-cyan game-title tracking-tight uppercase mb-4">
            Memory Game
          </h1>
          <div className="game-container">
            <div className="game-text mb-4">
              <p>
                Matches Found: <span className="highlight-cyan">{matches}</span> / {emojis.length}
              </p>
            </div>
            {gameOver ? (
              <div className="game-text mb-6">
                <p className="text-xl font-bold">Congratulations!</p>
                <p>
                  You found all {emojis.length} pairs!{' '}
                  <span className="highlight-yellow">🎉</span>
                </p>
                <button onClick={resetGame} className="game-button mt-4">
                  Play Again
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3 w-80 mx-auto">
                {cards.map((card, index) => (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(index)}
                    className={`h-20 w-20 rounded-lg text-3xl transition-all duration-300 border border-neon-cyan/20 ${
                      card.flipped || card.matched
                        ? 'bg-neon-pink text-white'
                        : 'bg-dark-base text-white hover:bg-[#252550] hover:border-neon-cyan/50'
                    }`}
                  >
                    {(card.flipped || card.matched) ? card.emoji : ''}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MemoryGame;