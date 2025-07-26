import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TicTacToe from './pages/TicTacToe';
import RockPaperScissors from './pages/RockPaperScissors';
import WhackAMole from './pages/WhackAMole';
import MemoryGame from './pages/MemoryGame';
import Wordle from './pages/Wordle';
import SnakesAndLadders from './pages/SnakesAndLadders';
import Game from './pages/Game';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Game />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/rock-paper-scissors" element={<RockPaperScissors />} />
        <Route path="/whack-a-mole" element={<WhackAMole />} />
        <Route path="/memory-game" element={<MemoryGame />} />
        <Route path="/wordle" element={<Wordle />} />
        <Route path="/snakes-ladders" element={<SnakesAndLadders />} />
      </Routes>
    </>
  );
}

export default App;