import './EndGameScreen.css';
import React from 'react';

function EndGameScreen({ gameStatus }) {
  return gameStatus === 'won' ? (
    <div style={{ height: window.innerHeight - 50, position: 'relative' }}>
      <div className='center'>
        <h1 className='end-game'>You won!</h1>
      </div>
    </div>
  ) : (
    <div style={{ height: window.innerHeight - 50, position: 'relative' }}>
      <div className='center'>
        <h1 className='end-game'>You lost!</h1>
      </div>
    </div>
  );
}

export default EndGameScreen;
