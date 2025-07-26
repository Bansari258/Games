import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Wordle = () => {
  const navigate = useNavigate();
  const words = ['FLEXA', 'GROKS', 'SPACE', 'ALIEN', 'COMET'];
  const [targetWord, setTargetWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const maxAttempts = 6;
  const wordLength = 5;

  const [guesses, setGuesses] = useState(
    Array(maxAttempts)
      .fill('')
      .map(() => Array(wordLength).fill(''))
  );
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const handleInput = (e) => {
    if (gameOver) return;
    const input = e.target.value.toUpperCase();
    if (/^[A-Z]*$/.test(input) && input.length <= wordLength) {
      setCurrentInput(input);
    }
  };

  const handleGuess = () => {
    if (gameOver || currentInput.length !== wordLength) return;

    const newGuesses = [...guesses];
    newGuesses[currentAttempt] = currentInput.split('');
    setGuesses(newGuesses);

    if (currentInput === targetWord) {
      setGameOver(true);
      setWon(true);
    } else if (currentAttempt + 1 === maxAttempts) {
      setGameOver(true);
    }

    setCurrentAttempt(currentAttempt + 1);
    setCurrentInput('');
  };

  const getLetterStyle = (letter, rowIndex, colIndex) => {
    if (rowIndex >= currentAttempt) return 'bg-dark-base text-white';
    if (letter === targetWord[colIndex]) return 'bg-neon-yellow text-white';
    if (targetWord.includes(letter)) return 'bg-neon-pink text-white';
    return 'bg-[#252550] text-white';
  };

  const resetGame = () => {
    setTargetWord(words[Math.floor(Math.random() * words.length)]);
    setGuesses(
      Array(maxAttempts)
        .fill('')
        .map(() => Array(wordLength).fill(''))
    );
    setCurrentAttempt(0);
    setCurrentInput('');
    setGameOver(false);
    setWon(false);
  };

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="text-white hover:text-neon-pink font-medium text-sm transition duration-300 m-5 absolute"
      >
        &#8592; Back
      </button>
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center">
          <h1 className="text-4xl text-neon-cyan game-title tracking-tight uppercase mb-4">
            Wordle
          </h1>
          <div className="game-container">
            {gameOver ? (
              <div className="game-text mb-6">
                <p className="text-xl font-bold">
                  {won ? 'Congratulations!' : 'Game Over!'}
                </p>
                <p>
                  The word was:{' '}
                  <span className="highlight-cyan">{targetWord}</span>
                  {won && <span className="highlight-yellow ml-2">🎉</span>}
                </p>
                <button onClick={resetGame} className="game-button mt-4">
                  Play Again
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-rows-6 gap-2 mb-6 w-80 mx-auto">
                  {guesses.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-5 gap-2">
                      {row.map((letter, colIndex) => (
                        <div
                          key={colIndex}
                          className={`h-14 w-14 flex items-center justify-center rounded-lg border border-neon-cyan/20 text-2xl font-bold ${getLetterStyle(
                            letter,
                            rowIndex,
                            colIndex
                          )}`}
                        >
                          {letter}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-4">
                  <input
                    type="text"
                    value={currentInput}
                    onChange={handleInput}
                    maxLength={wordLength}
                    className="bg-dark-base text-white border border-neon-cyan/30 rounded-lg px-4 py-2 focus:outline-none focus:border-neon-cyan w-40 text-center uppercase"
                  />
                  <button onClick={handleGuess} className="game-button">
                    Guess
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wordle;