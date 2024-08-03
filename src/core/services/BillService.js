import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const BASE_URL = "http://192.168.100.236:8080/api/auth";
axios.defaults.withCredentials = true;

export const pay = async (bill) => {
    try {
        const userId = localStorage.getItem("id");
        await axios.post(`${BASE_URL}/shopping-cart/pay?userId=${userId}`, bill);
    }catch (e) {
        throw new Error("Can't not save bill!")
    }
}

export const getAllBills = async (searchContent, page) => {
    try {
        const resp = await axiosInstance.get(`bills?billCode=${searchContent}&fullName=${searchContent}&page=${page}`);
        console.log(resp.data);
        return resp.data;
    } catch (e) {
        e.message = "Không có đơn hàng nào được tìm thấy!";
        throw e;
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

export const updateReceivedBill = async (billId) => {
    try {
        const resp = await axiosInstance.patch(`bills/receivedBill/${billId}`);
        return resp.data;
    } catch (e) {
        console.log(e);
    }
}