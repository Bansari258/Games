import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HandRaisedIcon, HandThumbUpIcon, HandThumbDownIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const RockPaperScissors = () => {
      const navigate = useNavigate();

  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [result, setResult] = useState('');

  const choices = ['Rock', 'Paper', 'Scissors'];

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
  };

  const determineWinner = (player, computer) => {
    if (player === computer) return 'Tie!';
    if (
      (player === 'Rock' && computer === 'Scissors') ||
      (player === 'Paper' && computer === 'Rock') ||
      (player === 'Scissors' && computer === 'Paper')
    ) {
      setPlayerScore(playerScore + 1);
      return 'You Win!';
    } else {
      setComputerScore(computerScore + 1);
      return 'Computer Wins!';
    }
  };

  const handleChoice = (choice) => {
    const compChoice = getComputerChoice();
    setPlayerChoice(choice);
    setComputerChoice(compChoice);
    setResult(determineWinner(choice, compChoice));
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
    setPlayerScore(0);
    setComputerScore(0);
  };

  const iconMap = {
    Rock: <HandRaisedIcon className="h-8 w-8 text-neon-cyan" />,
    Paper: <HandThumbUpIcon className="h-8 w-8 text-neon-yellow" />,
    Scissors: <HandThumbDownIcon className="h-8 w-8 text-neon-pink" />,
  };

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-text-white hover:text-neon-purple font-orbitron font-medium text-sm transition duration-300 m-5 absolute"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        Back
      </button>
      <div className="flex items-center  flex-col justify-center min-h-[calc(100vh-64px)]">
          <h1 className="text-4xl text-neon-cyan game-title tracking-tight uppercase mb-7 mt-7">
            Rock Paper Scissors
          </h1>
        <div className="text-center  bg-[#14142E50]  bg-opacity-80 rounded-xl shadow-lg p-8">
        
          <div className="game-container">
            <div className="flex justify-center gap-8 mb-8">
              {choices.map((choice) => (
                <button
                  key={choice}
                  onClick={() => handleChoice(choice)}
                  className="game-button flex flex-col items-center gap-2 px-6 py-4 rounded-lg shadow-md hover:bg-neon-cyan/10 transition"
                >
                  {iconMap[choice]}
                  <span className="mt-1 text-lg">{choice}</span>
                </button>
              ))}
            </div>
            <div className="game-text mb-6 space-y-2">
              <p>
                Your Choice:{' '}
                <span className="highlight-cyan flex items-center gap-2">
                  {playerChoice ? (
                    <>
                      {iconMap[playerChoice]}
                      {playerChoice}
                    </>
                  ) : 'None'}
                </span>
              </p>
              <p>
                Computer's Choice:{' '}
                <span className="highlight-pink flex items-center gap-2">
                  {computerChoice ? (
                    <>
                      {iconMap[computerChoice]}
                      {computerChoice}
                    </>
                  ) : 'None'}
                </span>
              </p>
              <p
                className={`mt-4 font-bold text-xl ${
                  result === 'You Win!'
                    ? 'highlight-yellow'
                    : result === 'Computer Wins!'
                    ? 'highlight-pink'
                    : ''
                }`}
              >
                {result || 'Make a choice!'}
              </p>
            </div>
            <div className="flex justify-around game-text mb-8 gap-8">
              <p>
                Your Score: <span className="highlight-cyan text-lg">{playerScore}</span>
              </p>
              <p>
                Computer Score:{' '}
                <span className="highlight-pink text-lg">{computerScore}</span>
              </p>
            </div>
            <button
              onClick={resetGame}
              className="game-button px-6 py-3 rounded-lg shadow hover:bg-neon-yellow/10 transition"
            >
              Reset Game
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RockPaperScissors;