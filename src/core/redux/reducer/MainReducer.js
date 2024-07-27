import {combineReducers} from "redux";
import productReducer from "./ProductReducer";

const mainReducer = combineReducers({
    products: productReducer
})

export default mainReducer;