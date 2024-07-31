import { LOGIN_SUCCESS, LOGOUT, SET_REMEMBER } from '../actions/AuthenticationActions';

const initialState = {
    isAuthenticated: !!localStorage.getItem('isAuthenticated'),
    user: null,
    rememberMe: JSON.parse(localStorage.getItem('rememberMe')) || false,
};

const AuthenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        case SET_REMEMBER:
            return {
                ...state,
                rememberMe: action.payload,
            };
        default:
            return state;
    }
};

export default AuthenticationReducer;