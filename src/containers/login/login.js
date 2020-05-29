import React, { PureComponent, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { RegularCard } from '../../components/cards/regular-card';
import { GoogleLogin } from 'react-google-login';
import { Button } from '@material-ui/core';
import { connect, bindActionCreators } from 'react-redux';
import * as actions from '../../actions'

/**
 *  로그인 컨테이너
 */

class Login extends PureComponent {

    constructor(props) {
        super(props);
        // randomUserId is used to emulate a unique user id for this demo usage
        this.responseGoogle = this.responseGoogle.bind(this)
        this.responsefail = this.responsefail.bind(this)
    }
    //함수
    responseGoogle = (response) => {
        console.log(response);
        const token = response.accessToken;
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': response.accessToken
        }
        console.log(token);
        axios.post(
            'http://localhost:9090/login/signIn', "data", {
            headers: headers
        }).then(response => {
            console.log("success");
            console.log(this.props.store);
            
            this.props.handleLogin();
            localStorage.setItem( "Authorization", token )
            console.log("플래그 값좀 보자:");
            
            this.props.history.push('/channel');
            
        }).catch(() => {
            console.log("failed");
            // If request is bad show an error to the user
            this.props.handleAuthfail();
            localStorage.clear()
        });
    };

    responsefail = () => {
        alert("로그인 실패");
    };

    //태그

    render() {
        return (
            <RegularCard
                cardTitle="로그인 하세요"
                cardSubtitle="서비스 이용을 위해 로그인하세요"
                style={{ border: '1px solid #ddd' }}
            >
                <Button>
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
                </Button>
            </RegularCard>
        );
    }
}

const mapStateToProp = (state) => {
    return {
      flag: state.userReducer.flag
    };
  }

const mapDispatchToProp = (dispatch) => {
    return {
        handleLogin: () => {dispatch(actions.login())},
        handleLogout: () => {dispatch(actions.logout())},
        handleAuthfail: () => {dispatch(actions.authFail())}
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(Login);
