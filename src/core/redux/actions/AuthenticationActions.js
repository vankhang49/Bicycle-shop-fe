import * as authenticationService from "../../services/AuthenticationService";
import {clearCart, deleteFromCart} from "./CartActions";

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const SET_REMEMBER = 'SET_REMEMBER';

export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
});

export const logoutAction = () => {
    return async (dispatch) => {
        try {
            await authenticationService.logout();
            localStorage.removeItem('fullName');
            localStorage.removeItem('avatar');
            localStorage.removeItem('id');
            localStorage.removeItem('isAuthenticated')
            localStorage.removeItem('lastTime');
            dispatch({
                type: LOGOUT,
            });
        } catch (error) {
            // Handle errors as needed
            throw error;
        }
    };
};

export const setRemember = (remember) => ({
    type: SET_REMEMBER,
    payload: remember,
});