import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TicTacToe = () => {
      const navigate = useNavigate();

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board) || isDraw()) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const isDraw = () => {
    return board.every((cell) => cell !== null) && !calculateWinner(board);
  };

  const winner = calculateWinner(board);
  const draw = isDraw();
  const status = winner
    ? `Winner: ${winner === 'X' ? 'Player (X)' : 'Player (O)'}`
    : draw
    ? 'Game Draw!'
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
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
            Tic Tac Toe
          </h1>
          <div className="game-container">
            <div className="game-text mb-4">
              {status}
              {(winner || draw) && (
                <span className="highlight-yellow ml-2">🎉</span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3 w-80 mx-auto">
              {board.map((cell, index) => (
                <button
                  key={index}
                  onClick={() => handleClick(index)}
                  className={`h-24 w-24 rounded-lg text-4xl font-bold transition-all duration-300 border border-neon-cyan/20 ${cell === 'X'
                      ? 'bg-dark-base text-neon-cyan'
                      : cell === 'O'
                        ? 'bg-dark-base text-neon-pink'
                        : 'bg-dark-base text-white hover:bg-[#252550] hover:border-neon-cyan/50'}`}
                >
                  {cell}
                </button>
              ))}
            </div>
            {(winner || draw) && (
              <button onClick={resetGame} className="game-button mt-6">
                Play Again
              </button>
            )}
          </div>
        </div>
      </div></>
  );
};

export default TicTacToe;