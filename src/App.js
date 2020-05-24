import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';

/**
 *  재훈
 *  원래 HomePage이나 아직 지식부족으로 잠시 보관해놓고
 *  다른기능 구현되면 그때 제대로 갖다 쓸예정입니다. 
 *  Login, Channel Api 구현후 추가될 예정
 */

class App extends React.Component {

  constructor(props) {
    super(props);
    // randomUserId is used to emulate a unique user id for this demo usage
    this.UserName = "";
    this.UserEmail = "";
    this.UserHobby = "";
    this.state = {
      accessToken : ""
    };
  }
  //함수
responseGoogle = (response) => {
  console.log(response);
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Authorization': response.accessToken
  }
  console.log(response.accessToken);
  axios.post(
    'http://localhost:9090/login/signIn',"data", {
      headers: headers
    }).then(response => {
      this.setState({accessToken : response.accessToken })
    });
};

responsefail = () => {
alert("로그인 실패");
};

//태그

  render() {
    return(
      <div>
      <GoogleLogin
        clientId="93172012175-1us86pmqgilm2kg38knddg8g72d3jari.apps.googleusercontent.com"
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Google로 LogIn
          </button>
        )}
        onSuccess={this.responseGoogle}
        onFailure={this.responsefail}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true} 
      />
      </div>
    );
  }
}


export default App;
