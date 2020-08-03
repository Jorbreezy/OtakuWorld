import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import apiRequest from './Util';

const Register = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
    err: '',
  });

  const history = useHistory();

  const handleChange = (e) => {
    setState({
      [e.target.id]: e.target.value,
    });
  };

  const handleClick = () => {
    const { username, password } = state;

    apiRequest('/auth/register', {
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

  const login = () => {
    history.push('/login');
  };

  return (
    <div>
      <div>
        <h2>Register</h2>
        <hr />
      </div>
      <div className="container">
        <h3>Username</h3>
        <input type="text" placeholder="Enter Username" id="username" name="username" onChange={handleChange} />

        <h3>Password</h3>
        <input type="password" placeholder="Enter Password" id="password" name="psw" onChange={handleChange} />

        <p>{ state.warning }</p>

        <button type="button" onClick={handleClick}>Register</button>
        <button type="button" onClick={login}>login</button>
      </div>
    </div>
  );
};

export default Register;
