import React, { FC } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import Chatroom from '../containers/chatroom/chatroom';


const AuthorizedRoutes = () => (
  <div>
    <Switch>
      <Route exact path="/channel" component={Chatroom} />
      <Route path="/channel/:channelNo" component={Chatroom} />
    </Switch>
  </div>
);
export default AuthorizedRoutes;