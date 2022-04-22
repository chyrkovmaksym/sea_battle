import './Login.css';
import React, { useState } from 'react';

function Login({ routeChange, logIn, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(true);
  const onLogin = () => {
    fetch('https://battleship-123.herokuapp.com/login', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setUser(data);
          routeChange('about');
          logIn(true);
        } else {
          setValid(false);
        }
      });
  };
  return (
    <div>
      <div className='form'>
        <div>
          <div style={{ textAlign: 'center' }}>
            <h2>LOG IN</h2>
          </div>
          <div className='formFields'>
            <p>Enter your email:</p>
            <input
              type='email'
              placeholder='Email'
              onChange={(event) => {
                setEmail(event.target.value);
                setValid(true);
              }}
            ></input>
            <p>Enter your password:</p>
            <input
              type='password'
              placeholder='Password'
              onChange={(event) => {
                setPassword(event.target.value);
                setValid(true);
              }}
            ></input>
            {!valid && (
              <p style={{ color: 'red', fontSize: 'medium' }}>Invalid data!</p>
            )}
            <br />
            <button className='btn' onClick={onLogin}>
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
