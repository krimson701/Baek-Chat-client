export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const AUTH_FAIL = 'auth_fail';

export function login(userInfo){
    return{
        type: LOGIN,
        userInfo : userInfo
    }
}

export function logout(){
    return{
        type: LOGOUT
    }
}

export function authFail(){
    return{
        type: AUTH_FAIL
    }
}