import React from 'react';
import './App.css';
import UnauthorizedRoutes from './routes/unauthorized-routes';
import AuthorizedRoutes from './routes/authorized-routes';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Navbar from './components/navbar';
import * as actions from './actions'

class App extends React.Component {

  constructor(props) {
    super(props);

    /**
     * 로컬스토리지에 userInfo가 있으면 setFlag = 로그인
     */
    if (localStorage.getItem("UserInfo")) {
      console.log(localStorage.getItem("UserInfo"));

      this.props.handleLogin(JSON.parse(localStorage.getItem("UserInfo")));

    }
  }

  render() {
    console.log("스토어 테스트 : "+this.props.flag);
    
    // 인증 실패
    if (!(this.props.flag === "login")) {
      return <UnauthorizedRoutes/>
    }
    
    // 인증 성공
    return (
      <>
        <RootContainer>
          <Navbar />
          <Main>
            <div>
              <AuthorizedRoutes />
            </div>
          </Main>
        </RootContainer>
      </>
    );
  }
}

const RootContainer = styled.div`
  display: flex;
`;

const Main = styled.main`
  flex: 1 0 auto;
  width: calc(100vw - 200px);
  height: 100%;
`;
const mapStateToProp = (state) => {
  return {
    flag: state.userReducer.flag
  };
}

const mapDispatchToProp = (dispatch) => {
  return {
      handleLogin: (userInfo) => {dispatch(actions.login(userInfo))},
      handleLogout: () => {dispatch(actions.logout())},
      handleAuthfail: () => {dispatch(actions.authFail())}
  };
}

export default connect(mapStateToProp, mapDispatchToProp)(App);
