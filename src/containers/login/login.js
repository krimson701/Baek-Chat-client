import React, { PureComponent, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { RegularCard } from '../../components/cards/regular-card';
import { GoogleLogin } from 'react-google-login';
import { Button } from '@material-ui/core';
import { login, logout, authFail } from '../../actions';
import { createStore } from 'redux';
import loginApp from '../../reducers';
const store = createStore(loginApp);
console.log("store 값은?");
console.log(store);

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
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': response.accessToken
        }
        console.log(response.accessToken);
        axios.post(
            'http://localhost:9090/login/signIn', "data", {
            headers: headers
        }).then(response => {
            console.log("success");
            console.log(store);
            
            store.dispatch(login())
            localStorage.setItem( "Authorization", response.accessToken )


            console.log("플래그 값좀 보자:");

            console.log(store.getState().userReducer.flag);
        }).catch(() => {
            console.log("failed");
            // If request is bad show an error to the user
            store.dispatch(authFail())
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

export default Login
