import React, { FC } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import Chatroom from '../containers/chatroom/chatroom';


const AuthorizedRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/channel" component={Chatroom} />
      <Redirect to="/channel" />
    </Switch>
  </BrowserRouter>
);
export default AuthorizedRoutes;