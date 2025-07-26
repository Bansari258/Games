import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-64px)] overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 z-0 particles"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center mb-10">
        <h1
          className="text-5xl md:text-7xl font-extrabold tracking-tight uppercase mt-4 mb-5 pb-5 text-cyan-400 animate-glow"
          style={{
            textShadow: '0 0 20px #00E5FF',
          }}
        >
          Welcome to Game Hub
        </h1>
        <p className="text-lg md:text-xl text-cyan-100 mt-2 drop-shadow-[0_1px_8px_rgba(34,211,238,0.6)]">
          Click below to explore and play your favorite games
        </p>
      </div>
      <div className="relative z-10 flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => navigate('/games')}
          className="flex items-center gap-3 px-8 py-4 rounded-xl text-white text-lg font-bold shadow-lg hover:scale-105 transition-all duration-300 bg-gradient-to-r from-neon-cyan to-neon-pink glow-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-yellow-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.868v4.264a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;