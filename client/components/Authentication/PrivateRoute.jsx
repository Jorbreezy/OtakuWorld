/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './Auth';

const PrivateRoute = ({ component: Component, ...args }) => (
  <Route
    {...args}
    render={(props) => {
      if (Auth.isAuthenticated()) {
        return <Component {...props} />;
      }
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: {
              from: props.location,
            },
          }}
        />
      );
    }}
  />
);

export default PrivateRoute;
