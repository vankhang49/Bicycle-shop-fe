import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const BASE_URL = "http://localhost:8080/api/auth";
axios.defaults.withCredentials = true;

export const pay = async (bill) => {
    try {
        const userId = localStorage.getItem("id");
        await axios.post(`${BASE_URL}/shopping-cart/pay?userId=${userId}`, bill);
    }catch (e) {
        throw new Error("Can't not save bill!")
    }
}

export const getAllBills = async (userCode, fullName, page) => {
    try {
        const resp = await axiosInstance.get(`bills?userCode=${userCode}&fullName=${fullName}&page=${page}`);
        console.log(resp.data);
        return resp.data;
    } catch (e) {
        return [];
    }
}

export const getAllBillsByUserId = async () => {
    try {
        const userId = localStorage.getItem("id");
        const resp = await axiosInstance.get(`bills/user/${userId}`);
        console.log(resp.data);
        return resp.data;
    } catch (e) {
        return [];
    }
}