import React from 'react';

import {
  Link,
  useHistory,
} from 'react-router-dom';
import apiRequest from '../Authentication/Util';

const Nav = () => {
  const history = useHistory();

  const signout = () => {
    apiRequest('/auth/signOut', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => {
        history.push('/login');
      })
      .catch((err) => console.log(err));
  };

  return (
    <nav id="header">
      <div className="navItem">
        <h1>Otaku World</h1>
      </div>
      <div className="navItem">
        <input className="search" placeholder="Search..." />
      </div>
      <div className="navItem">
        <ul className="right">
          <li>
            <Link to="/discover">Discover</Link>
          </li>
          <li>|</li>
          <li>
            <Link to="/current">Currently Reading/Watching</Link>
          </li>
          <li>|</li>
          <li>
            <Link to="/add">Add manga or anime</Link>
          </li>
          <li>|</li>
          <li>
            <button type="button" onClick={signout}>Signout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
