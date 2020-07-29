import React from 'react';

import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
} from 'react-router-dom';

import List from '../Dashboard/List';

const Nav = () => (
  <Router>
    <nav>
      <ul className="right">
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>|</li>
        <li>
          <Link to="/list">list</Link>
        </li>
      </ul>
    </nav>

    <Switch>
      <Route exact path="/list" component={List} />
    </Switch>

  </Router>
);

export default Nav;
