import React from 'react';
import {
  Switch, Route,
} from 'react-router-dom';

import Nav from '../NavBar/Nav';
import List from './List';
// import Reading from './Manga/UsersManga';
import Form from './Form/Form';
import Detail from './Manga/Detail';

const Dashboard = () => (
  <>
    <Nav />
    <Switch>
      <div id="mainContainer">
        <Route exact path="/favorite" component={List} />
        <Route exact path="/add" component={Form} />
        <Route exact path={['/discover', '/']} component={List} />
        <Route exact path={['/discover/:id/:qtitle', '/favorite/:id/:qtitle']} component={Detail} />
      </div>
    </Switch>
  </>
);

export default Dashboard;
