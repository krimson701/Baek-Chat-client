import { LOGIN, LOGOUT, AUTH_FAIL } from '../actions';
import { combineReducers } from 'redux';

const initialState = {
    flag: 'logout',
};

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