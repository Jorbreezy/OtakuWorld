import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import apiRequest from './Util';

const Register = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    err: '',
  });

  const history = useHistory();

  const handleChange = (e) => {
    setState({
      ...state, [e.target.id]: e.target.value,
    });
  };

  const handleClick = () => {
    const { username, password, confirmPassword } = state;

    if (password !== confirmPassword) {
      setState({ err: 'Password does not match!' });
    } else {
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
    }
  };

  const login = () => {
    history.push('/login');
  };

  return (
    <div className="loginDiv">
      <div className="container">
        <div>
          <h2>Register</h2>
        </div>

        <div className="inputWrapper">
          <h3>Username</h3>
          <input type="text" placeholder="Enter Username" id="username" name="username" onChange={handleChange} />

          <h3>Password</h3>
          <input type="password" placeholder="Enter Password" id="password" name="psw" onChange={handleChange} />

          <h3>Confirm password</h3>
          <input type="password" placeholder="Confirm Password" id="confirmPassword" name="cpsw" onChange={handleChange} />

          <p className="authError">{ state.err }</p>

          <button type="button" onClick={handleClick}>Create Account</button>
        </div>
        <div className="redirectButton">
          <p>
            Have an account?
            <button type="button" onClick={login}>Login</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
