import React, { FC } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import Chatroom from '../containers/chatroom/chatroom';


const AuthorizedRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route path={`/channel/:channelNo`} component={Chatroom} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
  );

  export default AuthorizedRoutes;