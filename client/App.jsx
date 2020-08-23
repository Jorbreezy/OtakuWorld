import React, { PureComponent } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './components/styles/style.css';

import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import Dashboard from './components/Dashboard/Dashboard';

class App extends PureComponent {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />

          <Route component={Dashboard} />
        </Switch>
        <footer>
          <p>Jordan Corp &copy; 2020</p>
        </footer>
      </Router>
    );
  }
}

export default App;
