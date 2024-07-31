import {GET_ALL_PRODUCTS} from "../Constant";

const productReducer = (products = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_ALL_PRODUCTS:
            return [...products, payload];
        default:
            return products;

    }
}
export default productReducer;