import './Register.css';
import React, { useState } from 'react';

function Register({ routeChange }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(true);

  const onRegister = () => {
    if (!name.length || !email.length || !password.length) {
      setValid(false);
    } else {
      fetch('https://battleship-123.herokuapp.com/register', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.status === 'success') {
            routeChange('login');
          } else {
            setValid(false);
          }
        });
    }
  };
  return (
    <div className='form'>
      <div>
        <div style={{ textAlign: 'center' }}>
          <h2>REGISTER</h2>
        </div>
        <div className='formFields'>
          <p>Enter your name:</p>
          <input
            type='text'
            placeholder='Name'
            onChange={(event) => {
              setName(event.target.value);
              setValid(true);
            }}
          ></input>
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
          <button className='btn' onClick={onRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
