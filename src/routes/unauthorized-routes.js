import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import Login from '../containers/login/login';

const UnauthorizedRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/login" component={Login} />
      <Redirect to="/login" />
    </Switch>
  </BrowserRouter>
);

export default UnauthorizedRoutes;
