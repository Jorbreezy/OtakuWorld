import React, { PureComponent } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './styles/style.css';
import './styles/form.css';

import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import Dashboard from './components/Dashboard/Dash';
import PrivateRoute from './components/Authentication/PrivateRoute';

class App extends PureComponent {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />

            <PrivateRoute exact path={['/discover', '/']} component={Dashboard} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
