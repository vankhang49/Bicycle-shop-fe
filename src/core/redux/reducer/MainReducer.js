import {combineReducers} from "redux";
import productReducer from "./ProductReducer";
import {cartReducer} from "./CartReducer";
import AuthenticationReducer from "./AuthenticationReducer";

const mainReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    auth: AuthenticationReducer,
})

export default mainReducer;