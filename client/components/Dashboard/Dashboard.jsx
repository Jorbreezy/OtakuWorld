import React from 'react';
import {
  Switch, Route,
} from 'react-router-dom';

import Nav from '../NavBar/Nav';
import MangaList from '../Manga/MangaList';
import AddManga from '../AddManga/Addmanga';
import MangaDetail from '../Detail/MangaDetail';

const Dashboard = () => (
  <>
    <Nav />
    <div id="mainContainer">
      <Switch>
        <Route exact path="/favorite" component={MangaList} />
        <Route exact path="/add" component={AddManga} />
        <Route exact path={['/discover', '/']} component={MangaList} />
        <Route exact path="/manga/:id/:qtitle" component={MangaDetail} />
      </Switch>
    </div>

  </>
);

export default Dashboard;
