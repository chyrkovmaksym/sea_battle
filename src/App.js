import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Users from './components/Users/Users';
import Friends from './components/Friends/Friends';
import OnlineGame from './components/OnlineGame/OnlineGame';
import BotGame from './components/BotGame/BotGame';

function App() {
  const [route, setRoute] = useState('about');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  return (
    <div className='bg'>
      <Navbar
        route={route}
        routeChange={(route) => setRoute(route)}
        loggedIn={isLoggedIn}
        logIn={(value) => setIsLoggedIn(value)}
      />
      {route === 'about' ? (
        <About route={route} setRoute={setRoute} isLoggedIn={isLoggedIn} />
      ) : route === 'login' ? (
        <Login
          routeChange={(route) => setRoute(route)}
          logIn={(value) => setIsLoggedIn(value)}
          setUser={(value) => setUser(value)}
        />
      ) : route === 'register' ? (
        <Register routeChange={(route) => setRoute(route)} />
      ) : route === 'botgame' ? (
        <BotGame isOnline={false} />
      ) : route === 'users' ? (
        <Users user={user} isLoggedIn={isLoggedIn} />
      ) : route === 'friends' ? (
        <Friends invite={false} myUser={user} />
      ) : route === 'onlinegame' ? (
        <OnlineGame isOnline={true} user={isLoggedIn ? user : undefined} />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
