import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';


const Game = () => {
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
        <div className='flex flex-col items-center w-screen h-screen pt-8'>
            <div className="w-full flex items-center justify-between px-8 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="text-text-white hover:text-neon-purple font-orbitron font-medium text-sm transition duration-300"
                >
                    &#8592; Back
                </button>
                <h1 className="text-2xl font-orbitron font-bold text-neon-blue text-center flex-1">
                    Select a Game
                </h1>
                <div className="w-16" /> {/* Spacer for alignment */}
            </div>
            <div className="flex flex-col  justify-content-center align-items-center gap-4">
                {games.map((game) => (
                    <button
                        key={game.name}
                        onClick={() => navigate(game.path)}
                        className={`font-orbitron font-medium text-sm transition duration-300 ${location.pathname === game.path
                                ? 'text-neon-blue border-b-2 border-neon-blue'
                                : 'text-text-white hover:text-neon-purple'
                            }`}
                    >
                        {game.name}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Game
