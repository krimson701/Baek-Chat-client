import React, { Component } from 'react';
import './App.css';
import UnauthorizedRoutes from './routes/unauthorized-routes';
import AuthorizedRoutes from './routes/authorized-routes';
import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

/**
 *  재훈
 *  원래 HomePage이나 아직 지식부족으로 잠시 보관해놓고
 *  다른기능 구현되면 그때 제대로 갖다 쓸예정입니다. 
 *  Login, Channel Api 구현후 추가될 예정
 */

class App extends React.Component {

  render() {
    console.log("플래그 값좀 보자:");
    
    console.log(this.props.store.getState().userReducer.flag);
    // 인증 실패
    if (!(this.props.store.getState().userReducer.flag === "login")) {
      return <UnauthorizedRoutes store={this.props.store} />;
    }

    // 인증 성공
    return (
      <>
        <RootContainer>
          <Main>
            <div>
              <AuthorizedRoutes store={this.props.store} />
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


export default App;
