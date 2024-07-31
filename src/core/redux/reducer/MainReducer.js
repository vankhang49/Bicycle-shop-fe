import {combineReducers} from "redux";
import productReducer from "./ProductReducer";
import {cartReducer} from "./CartReducer";

const mainReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
})

export default mainReducer;