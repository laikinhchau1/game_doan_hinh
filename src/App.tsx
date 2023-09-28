import React from 'react';
import Board from './components/Board';
import Game from './components/Game';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Shape Matcher</h1>
      </header>
      <main>
        <Game />
      </main>
    </div>
  );
};

export default App;

