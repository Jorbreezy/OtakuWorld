import React from 'react';
import { FiLogOut } from 'react-icons/fi';

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

          <li>
            <Link to="/current">Currently Reading/Watching</Link>
          </li>

          <li>
            <Link to="/add">Add manga or anime</Link>
          </li>

          <li>
            <span className="signout"><FiLogOut onClick={signout} /></span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
