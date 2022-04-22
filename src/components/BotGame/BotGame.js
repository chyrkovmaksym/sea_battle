import './BotGame.css';
import React from 'react';
import Game from '../Game/Game';

function BotGame({ isOnline }) {
  return <Game isOnline={isOnline} />;
}

export default BotGame;
