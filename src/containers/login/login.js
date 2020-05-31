import React, { PureComponent, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { RegularCard } from '../../components/cards/regular-card';
import { GoogleLogin } from 'react-google-login';
import { Button } from '@material-ui/core';
import { connect, bindActionCreators } from 'react-redux';
import * as actions from '../../actions'
import { WebServerConstant } from '../../constants';

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
            'Authorization': token
        }
        axios.post(
            WebServerConstant.Server.API_HOST + '/login/signIn', "data", {
            headers: headers
        }).then(response => {
            console.log(response);
            let userInfo = response.data;
            this.props.handleLogin(userInfo);
            localStorage.setItem( "Authorization", token )
            this.props.history.push('/channel');
            
        }).catch(error => {
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
                <GoogleLogin
                    clientId={WebServerConstant.GOOGLE_CLIENT_ID}
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
        handleLogin: (userInfo) => {dispatch(actions.login(userInfo))},
        handleLogout: () => {dispatch(actions.logout())},
        handleAuthfail: () => {dispatch(actions.authFail())}
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(Login);
