import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WhackAMole = () => {
      const navigate = useNavigate();

  const [moles, setMoles] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  const popMole = () => {
    const newMoles = Array(9).fill(false);
    const randomIndex = Math.floor(Math.random() * 9);
    newMoles[randomIndex] = true;
    setMoles(newMoles);
  };

  const whackMole = (index) => {
    if (!moles[index] || gameOver) return;
    setScore(score + 1);
    setMoles(Array(9).fill(false));
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setMoles(Array(9).fill(false));
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
      setMoles(Array(9).fill(false));
      return;
    }

    if (!gameOver) {
      const moleTimer = setTimeout(popMole, 1000);
      const gameTimer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => {
        clearTimeout(moleTimer);
        clearInterval(gameTimer);
      };
    }
  }, [timeLeft, gameOver]);

  return (
    <><button
      onClick={() => navigate(-1)}
      className="text-text-white hover:text-neon-purple font-orbitron font-medium text-sm transition duration-300 m-5  absolute "
    >
      &#8592; Back
    </button><div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center">
          <h1 className="text-4xl text-neon-cyan game-title tracking-tight uppercase mb-4">
            Whack-a-Mole
          </h1>
          <div className="game-container">
            <div className="game-text mb-4">
              <p>
                Score: <span className="highlight-cyan">{score}</span>
              </p>
              <p>
                Time Left:{' '}
                <span className="highlight-pink">{timeLeft}s</span>
              </p>
            </div>
            {gameOver ? (
              <div className="game-text mb-6">
                <p className="text-xl font-bold">Game Over!</p>
                <p>
                  Final Score:{' '}
                  <span className="highlight-yellow">{score}</span>
                </p>
                <button onClick={startGame} className="game-button mt-4">
                  Play Again
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3 w-80 mx-auto">
                {moles.map((mole, index) => (
                  <button
                    key={index}
                    onClick={() => whackMole(index)}
                    className={`h-24 w-24 rounded-lg transition-all duration-300 border border-neon-cyan/20 ${mole
                        ? 'bg-neon-pink text-white'
                        : 'bg-dark-base text-white hover:bg-[#252550] hover:border-neon-cyan/50'}`}
                  >
                    {mole ? '🐹' : ''}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div></>
  );
};

export default WhackAMole;