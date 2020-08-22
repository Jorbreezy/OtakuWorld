import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import apiRequest from './Util';
import '../styles/login.css';

const Login = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
    warning: '',
  });

  const history = useHistory();

  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const handleClick = () => {
    const { username, password } = state;

    apiRequest('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (res.status !== 200) {
          setState({ warning: res.message });
        } else {
          history.push('/discover');
        }
      })
      .catch((err) => console.log(err));
  };

  const register = () => {
    history.push('/register');
  };

  return (
    <div className="loginDiv">
      <div className="container">
        <div>
          <h2>Login</h2>
        </div>

        <div className="inputWrapper">
          <h3>Username</h3>
          <input type="text" placeholder="Enter Username" id="username" name="username" onChange={handleChange} />

          <h3>Password</h3>
          <input type="password" placeholder="Enter Password" id="password" name="psw" onChange={handleChange} />

          <p className="authError">{ state.err }</p>

          <button type="button" onClick={handleClick}>Login</button>
        </div>
        <div className="redirectButton">
          <p>
            New to Otaku World?
            <button type="button" onClick={register}>Register</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
