import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MemoryGame = () => {
      const navigate = useNavigate();

  const emojis = ['🐱', '🐶', '🐰', '🦁', '🐻', '🦊', '🐼', '🐯'];
  const initialCards = [...emojis, ...emojis]
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({ id: index, emoji, flipped: false, matched: false }));

  const [cards, setCards] = useState(initialCards);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matches, setMatches] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleCardClick = (index) => {
    if (gameOver || cards[index].flipped || cards[index].matched || flippedCards.length === 2) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, { index, emoji: cards[index].emoji }];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstCard, secondCard] = newFlippedCards;
      if (firstCard.emoji === secondCard.emoji) {
        const updatedCards = [...newCards];
        updatedCards[firstCard.index].matched = true;
        updatedCards[secondCard.index].matched = true;
        setCards(updatedCards);
        setMatches(matches + 1);
        setFlippedCards([]);
        if (matches + 1 === emojis.length) {
          setGameOver(true);
        }
      } else {
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[firstCard.index].flipped = false;
          updatedCards[secondCard.index].flipped = false;
          setCards(updatedCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    const shuffledCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, flipped: false, matched: false }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatches(0);
    setGameOver(false);
  };

  return (
    <><button
      onClick={() => navigate(-1)}
      className="text-text-white hover:text-neon-purple font-orbitron font-medium text-sm transition duration-300 m-5  absolute "
    >
      &#8592; Back
    </button><div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
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
                    className={`h-20 w-20 rounded-lg text-3xl transition-all duration-300 border border-neon-cyan/20 ${card.flipped || card.matched
                        ? 'bg-neon-pink text-white'
                        : 'bg-dark-base text-white hover:bg-[#252550] hover:border-neon-cyan/50'}`}
                  >
                    {(card.flipped || card.matched) ? card.emoji : ''}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div></>
  );
};

export default MemoryGame;