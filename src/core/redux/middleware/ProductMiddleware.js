import * as productService from "../../services/ProductService";
import {GET_ALL_BICYCLE} from "../Constant";


export const getAllBicyclesMiddleware = (page, nameSearch, familyName, categoryName) => {
    return async (dispatch) => {
        console.log("call MiddleWare!!")
        const products = await productService.getAllProducts(page, nameSearch, familyName, categoryName);
        dispatch({
            type: GET_ALL_BICYCLE,
            payload: products
        })
    }
}