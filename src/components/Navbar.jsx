import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CubeIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const games = [
    { name: 'Snakes & Ladders', path: '/snakes-ladders' },
    { name: 'Tic Tac Toe', path: '/tic-tac-toe' },
    { name: 'Rock Paper Scissors', path: '/rock-paper-scissors' },
    { name: 'Whack-a-Mole', path: '/whack-a-mole' },
    { name: 'Memory Game', path: '/memory-game' },
    { name: 'Wordle', path: '/wordle' },
  ];

  return (
    <nav className="bg-gradient-to-r from-game-base to-[#141432] p-4 flex items-center gap-4 sticky top-0 z-10 border-b border-neon-blue/20">
      <CubeIcon className="w-6 h-6 text-neon-blue" />
      <div className="flex gap-4">
        {games.map((game) => (
          <button
            key={game.name}
            onClick={() => navigate(game.path)}
            className={`font-orbitron font-medium text-sm transition duration-300 ${
              location.pathname === game.path
                ? 'text-neon-blue border-b-2 border-neon-blue'
                : 'text-text-white hover:text-neon-purple'
            }`}
          >
            {game.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;