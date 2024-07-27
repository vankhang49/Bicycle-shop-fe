import {applyMiddleware, createStore} from "redux";
import {thunk} from "redux-thunk";
import mainReducer from "./reducer/MainReducer";

const middleware = [thunk];
const Store = createStore(mainReducer, {}, applyMiddleware(...middleware));
export default Store;