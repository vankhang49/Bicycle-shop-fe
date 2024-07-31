import * as productService from "../../services/ProductService";
import {GET_ALL_PRODUCTS} from "../Constant";


export const getAllBicyclesMiddleware = (page, nameSearch, familyName, categoryName, brandName) => {
    return async (dispatch) => {
        console.log("call MiddleWare!!")
        const products = await productService.getAllProducts(page, nameSearch, familyName, categoryName, brandName);
        dispatch({
            type: GET_ALL_PRODUCTS,
            payload: products
        })
    }
}