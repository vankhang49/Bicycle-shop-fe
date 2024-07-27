import {GET_ALL_BICYCLE} from "../Constant";

const productReducer = (products = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_ALL_BICYCLE:
            return [...products, payload];
        default:
            return products;

    }
}
export default productReducer;