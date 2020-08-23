import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import apiRequest from './apiRequest';
import './styles/auth.css';

const Login = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
    error: '',
  });

  const history = useHistory();

  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const handleClick = () => {
    const { username, password } = state;

    apiRequest('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(async (res) => {
        if (res.status !== 200) {
          setState({ error: (await res.json()).message });
          return;
        }
        history.push('/discover');
      })
      .catch((err) => console.error('Err: ', err));
  };

  return (
    <div className="loginDiv">
      <div className="container">
        <h2>Login</h2>
        <div className="inputWrapper">
          <h3>Username</h3>
          <input type="text" placeholder="Enter Username" id="username" name="username" onChange={handleChange} />

          <h3>Password</h3>
          <input type="password" placeholder="Enter Password" id="password" name="psw" onChange={handleChange} />

          <p className="authError">{ state.error }</p>

          <button type="button" onClick={handleClick}>Login</button>
        </div>
        <div className="redirectButton">
          <p>
            New to Otaku World?
            <a href="/register"> Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
