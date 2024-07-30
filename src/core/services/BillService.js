import axios from "axios";

const BASE_URL = "http://localhost:8080/api/public";
axios.defaults.withCredentials = true;

export const pay = async (bill) => {
    try {
        await axios.post(`${BASE_URL}/shopping-cart/pay`, bill);
    }catch (e) {
        throw new Error("Can't not save bill!")
    }
}