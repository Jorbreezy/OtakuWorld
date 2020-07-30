import React from 'react';

import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
} from 'react-router-dom';

import List from '../Dashboard/List';
import Reading from '../Dashboard/Manga/UsersManga';

const Nav = () => (
  <Router>
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
            <Link to="/currentlyWatching">Currently Watching</Link>
          </li>
          <li>|</li>
          <li>
            <Link to="/currentlyReading">Currently Reading</Link>
          </li>
          <li>|</li>
          <li>
            <Link to="/add">Add manga or anime</Link>
          </li>
          <li>|</li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
    </nav>

    <Switch>
      <Route exact path="/discover" component={List} />
      <Route exact path="/currentlyReading" component={Reading} />
    </Switch>

  </Router>
);

export default Nav;
