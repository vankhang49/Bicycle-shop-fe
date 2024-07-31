import axios from "axios";

const BASE_URL = "http://192.168.55.102:8080/api/auth";
axios.defaults.withCredentials = true;

export const pay = async (bill) => {
    try {
        const userId = localStorage.getItem("id");
        await axios.post(`${BASE_URL}/shopping-cart/pay?userId=${userId}`, bill);
    }catch (e) {
        throw new Error("Can't not save bill!")
    }
}