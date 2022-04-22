import './OnlineGame.css';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Game from '../Game/Game';
import Friends from '../Friends/Friends';
let socket;

function OnlineGame({ isOnline, user }) {
  const [roomInput, setRoomInput] = useState('');
  const [joined, setJoined] = useState(false);
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);

  const inputChange = (event) => {
    setRoomInput(event.target.value);
  };

  const join = (room) => {
    if (user) {
      socket = io('https://battleship-123.herokuapp.com');
      socket.emit('join', { name: user.user_name, room: room });
      setWaitingForOpponent(true);
      socket.on('message', (arg) => {
        console.log(arg.text);
        if (arg.inRoom === 1) {
          setJoined(true);
          setWaitingForOpponent(false);
        }
      });
      socket.on('opponent_disconnected', (arg) => {
        socket.disconnect();

        socket.off();
        setJoined(false);
      });
    }
  };
  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
        socket.off();
      }
    };
  }, []);

  return (
    <div>
      {waitingForOpponent ? (
        <p>Wait for opponent</p>
      ) : !joined ? (
        <div>
          <div className='join-room'>
            <h1 style={{margin: 'auto 30px'}}>Online: </h1>
            <input style={{ margin: 'auto 0', width: '30%', borderRadius: '10px'}}
              placeholder='enter room name'
              type='text'
              onChange={inputChange}
            />
            <button disabled={!roomInput.length} className='join-btn' onClick={() => join(roomInput)}>Join</button>
          </div>
          <Friends join={join} invite={true} myUser={user} />
        </div>
      ) : (
        <Game socket={socket} isOnline={isOnline} />
      )}
    </div>
  );
}

export default OnlineGame;
