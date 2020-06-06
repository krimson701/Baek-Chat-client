import React, { PureComponent, ChangeEvent, FormEvent } from 'react';
import { RegularCard } from '../../components/cards/regular-card';
import { GoogleLogin } from 'react-google-login';
import {
    signIn
} from '../../apis/login';
import { connect} from 'react-redux';
import * as actions from '../../actions'
import { WebServerConstant } from '../../constants';

/**
 *  로그인 컨테이너
 */

class Login extends PureComponent {

    constructor(props) {
        super(props);
        this.responseGoogle = this.responseGoogle.bind(this)
        this.responsefail = this.responsefail.bind(this)
    }
    

    responseGoogle = async (response) => {
        console.log(response);
        localStorage.setItem( "Authorization", response.accessToken );
        try {
            const userInfo = await signIn();
            console.log(userInfo);

            this.props.handleLogin(userInfo);
            this.props.history.push('/channel');
        } catch (e){
            console.log(e);
            
            console.log("failed");
            // Bad request시 타게됨, 체크 필요함
            this.props.handleAuthfail();
            localStorage.clear()
        }
    };

    responsefail = () => {
        alert("로그인 실패");
    };

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
