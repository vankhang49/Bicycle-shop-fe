import axios from "axios";

const BASE_URL = "http://192.168.100.236:8080/api/public";
axios.defaults.withCredentials = true;

export async function getAllPricingByProductId(productId) {
    try {
        const temp
            = await axios.get(`${BASE_URL}/products/detail/${productId}`);
        return temp.data.pricingList;
    } catch (e) {
        console.log(e)
        return [];
    }
}