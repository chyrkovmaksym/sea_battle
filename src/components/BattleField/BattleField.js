import './BattleField.css';
import React, { useEffect, useState } from 'react';
import { Ship_4, Ship_3, Ship_2, Ship_1, getShip } from '../ships';
import RedTriangle from '../../assets/images/triangle-red.png';
import GreenTriangle from '../../assets/images/triangle-green.png';

function BattleField({
  isMyField,
  setGameStarted,
  gameStarted,
  setIsMyTurn,
  isMyTurn,
  enemyMove,
  setEnemyMove,
  shipsAreLocated,
  setShipsAreLocated,
  isOnline,
  socket,
  recievedOpponentShips,
  setRecievedOpponentShips,
  recievedCoordinates,
  setRecievedCoordinates,
  setGameStatus,
  presentation
}) {
  const [busyCeils, setBusyCeils] = useState([]);
  const [openedCeils, setOpenedCeils] = useState([]);
  const [destroyedShips, setDestroyedShips] = useState([]);

  const tableStyle = {
    boxShadow: `0 0 2px 10px ${isMyField ? 'rgba(0, 0, 255, 0.2)' : 'rgba(255, 0, 0, 0.4)'}`,
  }

  useEffect(() => {
    if (!isOnline && !isMyField) {
      randomShips();
    }
    if (isOnline) {
      socket.on('recieve_initial_ships', (ceils) => {
        setRecievedOpponentShips(ceils);
      });

      socket.on('recieve_ship_coordinates', (value) => {
        setRecievedCoordinates(value);
      });
    }
  }, []);
  useEffect(() => {
    if (isMyField && isOnline) {
      setIsMyTurn(true);
      openCeil(recievedCoordinates % 10, Math.floor(recievedCoordinates / 10));
    }
  }, [recievedCoordinates]);
  useEffect(() => {
    if (!isMyField && isOnline) {
      setBusyCeils(recievedOpponentShips);
    }
  }, [recievedOpponentShips]);
  useEffect(() => {
    if (isMyField && gameStarted && !isOnline) {
      let i = Math.floor(Math.random() * 10);
      let j = Math.floor(Math.random() * 10);
      while (
        openedCeils.includes(i + j * 10) ||
        destroyedShips.includes(i + j * 10)
      ) {
        i = Math.floor(Math.random() * 10);
        j = Math.floor(Math.random() * 10);
      }
      for (const opened of openedCeils) {
        for (const busy of busyCeils) {
          if (opened === busy && !destroyedShips.includes(busy)) {
            i = opened % 10;
            j = Math.floor(opened / 10);
            if (i !== 0 && !openedCeils.includes(i - 1 + j * 10)) {
              i--;
            } else if (j !== 0 && !openedCeils.includes(i + (j - 1) * 10)) {
              j--;
            } else if (i !== 9 && !openedCeils.includes(i + 1 + j * 10)) {
              i++;
            } else if (j !== 9 && !openedCeils.includes(i + (j + 1) * 10)) {
              j++;
            }
            if (
              !destroyedShips.includes(i + j * 10) &&
              !openedCeils.includes(i + j * 10)
            ) {
              openCeil(i, j);
              return;
            }
          }
        }
      }
      openCeil(i, j);
    }
  }, [enemyMove]);

  useEffect(() => {
    if (destroyedShips.length >= 20) {
      if (socket) {
        socket.disconnect();
        socket.off();
      }
      if (isMyField) {
        setGameStatus('lost');
      } else {
        setGameStatus('won');
      }
    }
  }, [destroyedShips]);

  useEffect(() => {
    if (!isMyTurn && !isOnline) {
      setTimeout(() => {
        setEnemyMove(!enemyMove);
        setIsMyTurn(true);
      }, 2000);
    }
  }, [isMyTurn]);

  const openCeil = (i, j) => {
    setOpenedCeils([...openedCeils, i + j * 10]);
    if (busyCeils.includes(i + j * 10)) {
      const { thisCoordinates, otherCoordinates } = getShip(i, j, busyCeils);
      let destroyed = true;
      for (const ceil of otherCoordinates) {
        if (ceil === thisCoordinates) continue;

        if (!openedCeils.includes(ceil)) {
          destroyed = false;
        }
      }
      const pos = [];
      const dest = [];
      if (destroyed) {
        otherCoordinates.forEach((value) => {
          dest.push(value);
          pos.push([
            ...setOpenedCeilsAround(value % 10, Math.floor(value / 10)),
          ]);
        });
        if (pos.length) {
          setOpenedCeils([...openedCeils, ...pos.flat()]);
        }
        if (dest.length) {
          setDestroyedShips([...destroyedShips, ...dest]);
        }
      }
    }
  };

  const setOpenedCeilsAround = (i, j) => {
    const pos = [];
    if (j > 0) {
      pos.push(i + (j - 1) * 10);
    }
    if (j < 9) {
      pos.push(i + (j + 1) * 10);
    }
    if (i > 0) {
      pos.push(i - 1 + j * 10);
      if (j > 0) {
        pos.push(i - 1 + (j - 1) * 10);
      }
      if (j < 9) {
        pos.push(i - 1 + (j + 1) * 10);
      }
    }
    if (i < 9) {
      pos.push(i + 1 + j * 10);
      if (j > 0) {
        pos.push(i + 1 + (j - 1) * 10);
      }
      if (j < 9) {
        pos.push(i + 1 + (j + 1) * 10);
      }
    }
    return pos;
  };

  const ceilsArray = [];
  for (let i = 0; i < 10; i++) {
    ceilsArray.push([]);
    for (let j = 0; j < 10; j++) {
      ceilsArray[i].push(
        <div
          style={!isMyField ? { cursor: 'pointer' } : {}}
          className={
            isMyField === true
              ? destroyedShips.includes(i + j * 10)
                ? 'destroyed'
                : openedCeils.includes(i + j * 10) &&
                  busyCeils.includes(i + j * 10)
                ? 'injured'
                : openedCeils.includes(i + j * 10)
                ? 'opponentCeil'
                : busyCeils.includes(i + j * 10)
                ? 'ship'
                : 'myCeil'
              : destroyedShips.includes(i + j * 10)
              ? 'destroyed'
              : openedCeils.includes(i + j * 10)
              ? busyCeils.includes(i + j * 10)
                ? 'injured'
                : 'empty'
              : 'opponentCeil'
          }
          onClick={() => {
            if (!isMyField && isMyTurn) {
              if (
                !openedCeils.includes(i + j * 10) &&
                !destroyedShips.includes(i + j * 10)
              ) {
                openCeil(i, j);
                setIsMyTurn(false);
                if (isOnline) {
                  socket.emit('send_ship_coordinates', i + j * 10);
                }
              }
            }
          }}
        ></div>
      );
    }
  }

  const randomShips = () => {
    const ship4 = new Ship_4(ceilsArray, busyCeils).getRandomShip();
    ship4.busyCeils.map((value) => setBusyCeils([...busyCeils, value]));
    for (let i = 0; i < 2; i++) {
      const ship3 = new Ship_3(ceilsArray, busyCeils).getRandomShip();
      ship3.busyCeils.map((value) => setBusyCeils([...busyCeils, value]));
    }
    for (let i = 0; i < 3; i++) {
      const ship2 = new Ship_2(ceilsArray, busyCeils).getRandomShip();
      ship2.busyCeils.map((value) => setBusyCeils([...busyCeils, value]));
    }
    for (let i = 0; i < 4; i++) {
      const ship1 = new Ship_1(ceilsArray, busyCeils).getRandomShip();
      ship1.busyCeils.map((value) => setBusyCeils([...busyCeils, value]));
    }
  };

  return (
    <div className='field'>
      <h1>
        {isMyField ? (gameStarted ? 'You' : '') : isOnline ? 'Opponent' : 'Bot'}
      </h1>
      <table style={tableStyle}>
        <tbody>
          {ceilsArray.map((row, rIndex) => {
            return (
              <tr key={rIndex}>
                {row.map((col, cIndex) => {
                  return <td key={rIndex + cIndex}>{col}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {gameStarted !== false && (
        <div className='info'>
          <h1 style={{ margin: '5px', display: 'inline-block' }}>
            {`Destroyed ${destroyedShips.length} ${
              destroyedShips.length === 1 ? 'deck' : 'decks'
            } out of 20`}
          </h1>
          <div
            style={{
              display: 'inline-block',
              float: 'right',
              margin: '5px 10px',
            }}
          >
            <img
              src={isMyField ? GreenTriangle : RedTriangle}
              alt='error'
              width='30px'
              height='30px'
            />
          </div>
        </div>
      )}
      {isMyField && (
        <div className='set-game-buttons'>
          {!gameStarted && (
            <button className='handle-ships'
              onClick={() => {
                if (!shipsAreLocated) {
                  setShipsAreLocated(true);
                  randomShips();
                }
              }}
            >
              Locate my ships
            </button>
          )}
          <br />
          {!gameStarted && (
            <button className='handle-ships'
              onClick={() => {
                setBusyCeils([]);
                setShipsAreLocated(false);
              }}
            >
              Remove all my ships
            </button>
          )}
          <br />
          {!gameStarted && (
            <button className='start-game'
              onClick={() => {
                if (shipsAreLocated) {
                  if (isOnline) {
                    socket.emit('send_initial_ships', busyCeils);
                  }
                  setGameStarted(true);
                }
              }}
            >
              Start Game
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default BattleField;
