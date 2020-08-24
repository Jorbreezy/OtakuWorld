import React from 'react';
import { FiLogOut } from 'react-icons/fi';

import './styles/nav.css';

import {
  Link,
  useHistory,
} from 'react-router-dom';
import apiRequest from '../Utils/apiRequest';

const Nav = () => {
  const history = useHistory();

  const signout = () => {
    apiRequest('/api/auth/signOut', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => {
        history.push('/login');
      })
      .catch((err) => console.error(err));
  };

  return (
    <nav id="header">
      <button type="button" className="navItem websiteName" onClick={() => history.push('/discover')}>
        <h1>Otaku World</h1>
      </button>
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
