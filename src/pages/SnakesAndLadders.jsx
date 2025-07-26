import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SnakesAndLadders = () => {
  const navigate = useNavigate();

  const boardSize = 10;
  const totalSquares = boardSize * boardSize;

  const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
  const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };

  const [player1Pos, setPlayer1Pos] = useState(1);
  const [player2Pos, setPlayer2Pos] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [diceRoll, setDiceRoll] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const rollDice = () => {
    if (gameOver) return;
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);

    const newPos = currentPlayer === 1 ? player1Pos + roll : player2Pos + roll;
    let finalPos = newPos > totalSquares ? totalSquares : newPos;

    if (snakes[finalPos]) {
      finalPos = snakes[finalPos];
    } else if (ladders[finalPos]) {
      finalPos = ladders[finalPos];
    }

    if (currentPlayer === 1) {
      setPlayer1Pos(finalPos);
    } else {
      setPlayer2Pos(finalPos);
    }

    if (finalPos === totalSquares) {
      setGameOver(true);
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  const resetGame = () => {
    setPlayer1Pos(1);
    setPlayer2Pos(1);
    setCurrentPlayer(1);
    setDiceRoll(null);
    setGameOver(false);
    setWinner(null);
  };

  const getSquareStyle = (index, rowIdx, colIdx) => {
    const isSnakeStart = Object.keys(snakes).includes(String(index));
    const isSnakeEnd = Object.values(snakes).includes(index);
    const isLadderStart = Object.keys(ladders).includes(String(index));
    const isLadderEnd = Object.values(ladders).includes(index);

    let style = (rowIdx + colIdx) % 2 === 0 ? 'bg-[#1a2233]' : 'bg-[#232b3e]';
    style +=
      ' border border-[#2e3a5a] rounded-lg shadow-md transition-transform duration-150 hover:scale-105 flex flex-col items-center justify-center relative';

    if (isSnakeStart) style += ' ring-2 ring-[#FF6B6B]';
    if (isLadderStart) style += ' ring-2 ring-neon-yellow';

    return style;
  };

  const renderToken = (square) => {
    if (square === player1Pos && square === player2Pos) {
      return (
        <span className="flex items-center justify-center gap-1">
          <span className="h-6 w-6 rounded-full bg-neon-cyan text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow">
            P1
          </span>
          <span className="h-6 w-6 rounded-full bg-neon-pink text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow">
            P2
          </span>
        </span>
      );
    }
    if (square === player1Pos)
      return (
        <span className="h-7 w-7 rounded-full bg-neon-cyan text-white flex items-center justify-center text-sm font-bold border-2 border-white shadow">
          P1
        </span>
      );
    if (square === player2Pos)
      return (
        <span className="h-7 w-7 rounded-full bg-neon-pink text-white flex items-center justify-center text-sm font-bold border-2 border-white shadow">
          P2
        </span>
      );
    return null;
  };

  const renderIcon = (square) => {
    if (Object.keys(snakes).includes(String(square))) {
      return <span className="absolute top-1 left-1 text-sm">🐍</span>;
    }
    if (Object.keys(ladders).includes(String(square))) {
      return <span className="absolute top-1 right-1 text-sm">🪜</span>;
    }
    return null;
  };

  const board = Array.from({ length: totalSquares }, (_, i) => totalSquares - i);
  const rows = Array.from({ length: boardSize }, (_, rowIndex) =>
    board.slice(rowIndex * boardSize, (rowIndex + 1) * boardSize).reverse()
  ).reverse();

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="text-white hover:text-neon-pink font-medium text-sm transition duration-300 m-5 absolute"
      >
        &#8592; Back
      </button>
      <div className="flex flex-col items-center justify-between min-h-[calc(100vh-64px)] py-6">
        <div className="text-center">
          <h1 className="text-4xl text-neon-cyan game-title tracking-tight uppercase mb-6">
            Snakes & Ladders
          </h1>
          <div className="game-container">
            <div className="game-text space-y-2 mb-6">
              <p>
                Current Player:{' '}
                <span className={currentPlayer === 1 ? 'highlight-cyan' : 'highlight-pink'}>
                  Player {currentPlayer}
                </span>
              </p>
              <p>
                Dice Roll:{' '}
                <span className="highlight-yellow">
                  {diceRoll || 'Roll the dice!'}
                </span>
              </p>
            </div>
            <div className="flex justify-around game-text mb-8">
              <div className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-neon-cyan border-2 border-white"></span>
                <span className="highlight-cyan">P1: {player1Pos}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-neon-pink border-2 border-white"></span>
                <span className="highlight-pink">P2: {player2Pos}</span>
              </div>
            </div>
            {gameOver ? (
              <div className="game-text mb-6">
                <p className="text-2xl font-bold mb-2">Game Over!</p>
                <p>
                  Winner:{' '}
                  <span className={winner === 1 ? 'highlight-cyan' : 'highlight-pink'}>
                    Player {winner}
                  </span>{' '}
                  <span className="highlight-yellow text-2xl">🎉</span>
                </p>
                <button onClick={resetGame} className="game-button mt-4">
                  Play Again
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-10 gap-2 w-[580px] mx-auto mb-6 bg-[#151c2e] p-4 rounded-xl shadow-inner">
                {rows.map((row, rowIndex) =>
                  row.map((square, colIndex) => (
                    <div
                      key={square}
                      className={getSquareStyle(square, rowIndex, colIndex)}
                      style={{ minHeight: 48, minWidth: 48, position: 'relative' }}
                    >
                      <span className="text-xs text-gray-400 absolute top-1 right-1">
                        {square}
                      </span>
                      {renderIcon(square)}
                      {renderToken(square)}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        {!gameOver && (
          <div className="sticky bottom-4 z-10">
            <button onClick={rollDice} className="game-button">
              Roll Dice
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SnakesAndLadders;