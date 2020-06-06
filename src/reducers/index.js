import { LOGIN, LOGOUT, AUTH_FAIL } from '../actions';
import { combineReducers } from 'redux';

const initialState = {
    flag: 'logout',
};

/**
 * 다른 리듀서 추가되면 전부 import 해서 combine 코드만 남기기
 */
const userReducer = (state = initialState, action) => {

    
    const flag  = action.type ; 
    const userInfo = action.userInfo;
    switch(action.type){
        case LOGIN:
            return {
                ...state,
                userInfo,
                flag
              };
        case LOGOUT:
            return {
                ...state,
                flag
              };
        case AUTH_FAIL:
            return {
                ...state,
                flag
              };
        default:
            return state;
    }
}

const loginApp = combineReducers({ userReducer });

export default loginApp;