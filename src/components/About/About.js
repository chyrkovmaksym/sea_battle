import './About.css';
import React, {useState, useEffect} from 'react';
import Sample from '../../assets/images/sample.png';
function About({ isLoggedIn, setRoute }) {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', (event) => {
      setWidth(window.innerWidth);
    })
  })
  return (
    <div>
      <div className='description'>
        <h1>Sea Battle!</h1>
        <p>
          Hi! This is my first web project. Here I'l describe the technologies
          used while creating this application.
          <br />
          Front-end was made using React in functional style with React Hooks.
          Back-end consists of server (done by using Express library and Web
          Sockets) and data base (with PosgreSQL). Here you can play Sea Battle
          with eather bot or your friends. All the friendship requests and
          invitations were made using HTTP client-server connection. Web Sockets
          were used in order to transfer data during the online game.
          <br />
          Wish you great game. Have fun!
        </p>
        <br />
        {isLoggedIn ? (
          <button onClick={() => setRoute('botgame')}>Play</button>
        ) : (
          <button onClick={() => setRoute('login')}>Log In</button>
        )}
      </div>
      {width > 1400 && <div className='sample'>
        <img src={Sample} />
      </div>}
    </div>
  );
}

export default About;
