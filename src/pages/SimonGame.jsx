import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const SimonGame = () => {
  const navigate = useNavigate();
  const colors = ['red', 'green', 'blue', 'yellow'];
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [gameSeq, setGameSeq] = useState([]);
  const [userSeq, setUserSeq] = useState([]);
  const [alert, setAlert] = useState('Press Start to play');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // Play the game sequence when it updates
  useEffect(() => {
    if (isPlaying && gameSeq.length > 0) {
      playSequence();
    }
  }, [gameSeq]);

  const startGame = () => {
    setAlert('');
    setIsPlaying(true);
    setIsDisabled(true);
    setUserSeq([]);
    setGameSeq([]);
    setLevel(0);
    setScore(0);
    setTimeout(levelUp, 500); // Slight delay for better UX
  };

  const levelUp = () => {
    setLevel((prev) => prev + 1);
    setScore((prev) => prev + 1);
    setUserSeq([]); // Reset user sequence for new level
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setGameSeq((prev) => [...prev, randomColor]);
  };

  const playSequence = () => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < gameSeq.length) {
        boxFlashGame(gameSeq[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 800); // Adjust timing for sequence playback
  };

  const boxFlashGame = (color) => {
    const box = document.getElementById(color);
    if (box) {
      box.classList.add('active');
      setTimeout(() => {
        box.classList.remove('active');
      }, 400); // Duration of flash
    }
  };

  const boxFlashUser = (color) => {
    const box = document.getElementById(color);
    if (box) {
      box.classList.add('activeUser');
      setTimeout(() => {
        box.classList.remove('activeUser');
      }, 400);
    }
  };

  const handleBoxClick = (color) => {
    if (!isPlaying) return;
    boxFlashUser(color);
    const newUserSeq = [...userSeq, color];
    setUserSeq(newUserSeq);
    checkAnswer(newUserSeq.length - 1, newUserSeq);
  };

  const checkAnswer = (index, newUserSeq) => {
    if (newUserSeq[index] === gameSeq[index]) {
      if (newUserSeq.length === gameSeq.length) {
        setTimeout(() => {
          levelUp();
        }, 1000);
      }
    } else {
      setAlert('Wrong sequence! Game Over.');
      if (score > highscore) setHighscore(score);
      setIsPlaying(false);
      setIsDisabled(false);
    }
  };

  const resetGame = () => {
    setGameSeq([]);
    setUserSeq([]);
    setLevel(0);
    setScore(0);
    setIsPlaying(false);
    setIsDisabled(false);
    setAlert('Press Start to play');
  };

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="text-text-white hover:text-neon-purple font-orbitron font-medium text-sm transition duration-300 m-5 absolute"
      >
        &#8592; Back
      </button>
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="game-container w-full max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex flex-row items-center justify-center gap-4 md:gap-8">
              {/* Score Card */}
              <div className="flex-1">
                <div className="score-card text-center bg-dark-base rounded-lg p-3 shadow">
                  <h6 className="mb-1 text-sm text-white font-orbitron">Score</h6>
                  <h3 className="text-neon-cyan text-2xl font-bold mb-0">{score}</h3>
                  <small className="text-muted text-xs">Highscore: {highscore}</small>
                </div>
              </div>
              {/* Game Title */}
              <div className="flex-1 text-center">
                <h1 className="game-title text-3xl md:text-4xl tracking-tight uppercase mb-0">
                  Simon Game
                </h1>
              </div>
              {/* Level Card */}
              <div className="flex-1">
                <div className="score-card text-center bg-dark-base rounded-lg p-3 shadow">
                  <h6 className="mb-1 text-sm text-white font-orbitron">Level</h6>
                  <h3 className="text-neon-pink text-2xl font-bold mb-0">{level}</h3>
                </div>
              </div>
            </div>
            {/* Alert Message */}
            <div className="text-center mt-2">
              <p className="alert-message text-muted text-base">{alert}</p>
            </div>
          </div>

          {/* Game Board - 2x2 Grid */}
          <div className="flex justify-center mb-6">
            <div className="grid grid-cols-2 grid-rows-2 gap-4 w-64 md:w-80">
              {colors.map((c) => (
                <div
                  id={c}
                  key={c}
                  className={`simon-box ${c} rounded-xl h-24 md:h-32 bg-gradient-to-br cursor-pointer transition-all duration-200 active:scale-95`}
                  onClick={() => handleBoxClick(c)}
                  style={{ backgroundColor: `var(--${c})` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Control Button */}
          <div className="text-center">
            <button
              className="game-button text-lg px-8 py-2 disabled:opacity-50"
              onClick={startGame}
              disabled={isDisabled}
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimonGame;