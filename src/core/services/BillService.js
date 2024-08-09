import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const BASE_URL = "https://bicycle-shop-be.onrender.com/api/auth";
axios.defaults.withCredentials = true;

export const pay = async (bill) => {
    try {
        let userId = localStorage.getItem("id");
        if (userId === null) {
            userId = '';
        }
        await axios.post(`${BASE_URL}/shopping-cart/pay?userId=${userId}`, bill);
    }catch (e) {
        throw new Error("Lỗi, không thể thanh toán!")
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

export const getAllBillsByUserId = async (page) => {
    try {
        const userId = localStorage.getItem("id");
        const resp = await axiosInstance.get(`bills/user/${userId}?page=${page}`);
        console.log(resp.data);
        return resp.data;
    } catch (e) {
        return [];
    }
}

export const getBillById = async (billId) => {
    try {
        const resp = await axiosInstance.get(`bills/${billId}`);
        console.log(resp.data)
        return resp.data;
    } catch (e) {
        throw e.response.data;
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