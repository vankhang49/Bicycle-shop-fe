import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const BASE_URL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

export const getAllProductFamilies = async () => {
    try {
        const temp
            = await axios.get(`${BASE_URL}/api/public/product-families`);
        return temp.data;
    } catch (e) {
        return [];
    }
}

export const saveProductFamilies = async (productFamilies) => {
    try {
        const temp = await axiosInstance.post(`product-families`, productFamilies);
        return temp.data;
    } catch (e) {
        e.message = "Không thể thêm mới loại sản phẩm";
        throw e;
    }
}

export const deleteProductFamilies = async (id) => {
    try {
        const temp = await axiosInstance.delete(`product-families/${id}`);
        return temp.data;
    } catch (e) {
        e.message = "Không thể xóa loại sản phẩm!";
        throw e;
    }
}