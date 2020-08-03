import React from 'react';
import {
  Switch, Route,
} from 'react-router-dom';

import Nav from '../NavBar/Nav';
import List from './List';
import Reading from './Manga/UsersManga';
import Form from './Add/Form';
import SingleItem from './Manga/singleItem';

const Dashboard = () => (
  <>
    <Nav />
    <Switch>
      <Route exact path="/current" component={Reading} />
      <Route exact path="/add" component={Form} />
      <Route exact path={['/discover', '/']} component={List} />
      <Route exact path="/discover/:qtitle" component={SingleItem} />
    </Switch>
  </>
);

export default Dashboard;
