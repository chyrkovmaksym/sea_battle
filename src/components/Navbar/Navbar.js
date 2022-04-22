import './Navbar.css';
import React from 'react';

function Navbar({ routeChange, loggedIn, logIn, route }) {
  return (
    <ul>
      <li className={route === 'about' ? 'active' : ''}>
        <p
          onClick={() => {
            routeChange('about');
          }}
        >
          About
        </p>
      </li>
      {!loggedIn ? (
        <li style={{ float: 'right' }} className={route === 'login' ? 'active' : ''}>
          <p
            onClick={() => {
              routeChange('login');
            }}
          >
            Log In
          </p>
        </li>
      ) : (
        <span></span>
      )}
      {!loggedIn ? (
        <li style={{ float: 'right' }} className={route === 'register' ? 'active' : ''}>
          <p
            onClick={() => {
              routeChange('register');
            }}
          >
            Register
          </p>
        </li>
      ) : (
        <div>
        <li style={{ float: 'right' }}>
          <p
            onClick={() => {
              logIn(false);
              routeChange('login');
            }}
          >
            Log Out
          </p>
        </li>
        <li style={{float: 'right'}} className={route === 'users' ? 'active' : ''}>
        <p
          onClick={() => {
            routeChange('users');
          }}
        >
          Users
        </p>
      </li>
        <li style={{ float: 'right' }} className={route === 'friends' ? 'active' : ''}>
        <p
          onClick={() => {
            routeChange('friends');
          }}
        >
          Friends
        </p>
      </li>
      <li style={{ float: 'right' }} className={route === 'botgame' ? 'active' : ''}>
        <p
          onClick={() => {
            routeChange('botgame');
          }}
        >
          Game with bot
        </p>
      </li>
      <li style={{ float: 'right' }} className={route === 'onlinegame' ? 'active' : ''}>
        <p
          onClick={() => {
            routeChange('onlinegame');
          }}
        >
          Online Game
        </p>
      </li>
      </div>
      )}
    </ul>
  );
}

export default Navbar;
