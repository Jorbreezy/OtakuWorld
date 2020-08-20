/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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
      <div className="navItem websiteName" onClick={() => history.push('/discover')}>
        <h1>Otaku World</h1>
      </div>
      <div className="navItem">
        <ul className="right">
          <li>
            <Link to="/discover">Discover</Link>
          </li>

          <li>
            <Link to="/favorite">Favorite</Link>
          </li>

          <li>
            <Link to="/add">Add manga</Link>
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
