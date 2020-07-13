import React, { useState } from 'react';

const Login = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
    warning: '',
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const handleClick = () => {
    const { username, password } = state;

    fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (res.status === 401) {
          setState({
            warning: 'Invalid Username or Password',
          });
        } else if (res.status === 406) {
          setState({
            warning: 'User not found try again',
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <h2>Login</h2>
        <hr />
      </div>
      <div className="container">
        <h3>Username</h3>
        <input type="text" placeholder="Enter Username" id="username" name="username" onChange={handleChange} />

        <h3>Password</h3>
        <input type="password" placeholder="Enter Password" id="password" name="psw" onChange={handleChange} />

        <p>{ state.warning }</p>

        <button type="button" onClick={handleClick}>Login</button>
      </div>
    </div>
  );
};

export default Login;
