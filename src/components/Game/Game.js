import './Game.css';
import React, { useState } from 'react';
import BattleField from '../BattleField/BattleField';
import EndGameScreen from '../EndGameScreen/EndGameScreen';

function Game({ socket, isOnline }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [isMyTurn, setIsMyTurn] = useState(true); //my turn
  const [enemyMove, setEnemyMove] = useState(false);
  const [shipsAreLocated, setShipsAreLocated] = useState(false);
  const [recievedOpponentShips, setRecievedOpponentShips] = useState();
  const [recievedCoordinates, setRecievedCoordinates] = useState();
  const [gameStatus, setGameStatus] = useState('playing');

  return gameStatus === 'won' ? (
    <EndGameScreen gameStatus={gameStatus} />
  ) : gameStatus === 'lost' ? (
    <EndGameScreen gameStatus={gameStatus} />
  ) : (
    <div style={{ textAlign: 'center' }}>
      <BattleField
        isMyField={true}
        setGameStarted={setGameStarted}
        gameStarted={gameStarted}
        setIsMyTurn={setIsMyTurn}
        isMyTurn={isMyTurn}
        enemyMove={enemyMove}
        setEnemyMove={setEnemyMove}
        shipsAreLocated={shipsAreLocated}
        setShipsAreLocated={setShipsAreLocated}
        isOnline={isOnline}
        socket={socket}
        recievedOpponentShips={recievedOpponentShips}
        setRecievedOpponentShips={setRecievedOpponentShips}
        recievedCoordinates={recievedCoordinates}
        setRecievedCoordinates={setRecievedCoordinates}
        setGameStatus={setGameStatus}
      />
      {gameStarted && (
        <BattleField
          isMyField={false}
          setIsMyTurn={setIsMyTurn}
          isMyTurn={isMyTurn}
          enemyMove={enemyMove}
          setEnemyMove={setEnemyMove}
          shipsAreLocated={shipsAreLocated}
          setShipsAreLocated={setShipsAreLocated}
          isOnline={isOnline}
          socket={socket}
          recievedOpponentShips={recievedOpponentShips}
          setRecievedOpponentShips={setRecievedOpponentShips}
          recievedCoordinates={recievedCoordinates}
          setRecievedCoordinates={setRecievedCoordinates}
          setGameStatus={setGameStatus}
        />
      )}
      <div>
        <h1 style={{marginTop: '0'}}>{isMyTurn ? (gameStarted ? 'Your turn!' : '') : isOnline ? 'Opponent\'s turn!' : 'Bot\'s turn!'}</h1>
        <br/>
      </div>
    </div>
  );
}

export default Game;
