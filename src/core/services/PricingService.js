import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

export async function getAllPricingByProductId(productId) {
    try {
        const temp
            = await axios.get(`${BASE_URL}/api/public/products/detail/${productId}`);
        return temp.data.pricingList;
    } catch (e) {
        return [];
    }
}