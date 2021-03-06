import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import { signIn } from './auth';
import AuthRoute from './AuthRoute';

import Profile from './Profile';
import LoginForm from './LoginForm';
import LogoutButton from './LogoutButton';

/**
 *  재훈
 *  원래 HomePage이나 아직 지식부족으로 잠시 보관해놓고
 *  다른기능 구현되면 그때 제대로 갖다 쓸예정입니다. 
 *  Login, Channel Api 구현후 추가될 예정
 */

function App() {
  const [user, setUser] = useState(null);
  const authenticated = (user != null) ? user.id != null : user != null;
    
  const login = ({ userId }) => signIn({ userId }).then(res => { setUser(res)});
  const logout = () => setUser(null);

  console.log("auth: "+ authenticated);
  console.log(user);
  
  return (
  <Router>
    <header>
        <Link to="/profile">
          <button>Profile</button>
        </Link>
        {authenticated ? (
          <LogoutButton logout={logout} />
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
    </header>
    <hr />
    <main>
      <Switch>
        <Route
          path="/login"
          render={props => (
            <LoginForm authenticated={authenticated} login={login} {...props} />
          )}
        />
        <AuthRoute
          authenticated={authenticated}
          path="/profile"
          render={props => <Profile user={user} {...props} />}
        />
      </Switch>
    </main>
  </Router>
  );
}

export default App;
