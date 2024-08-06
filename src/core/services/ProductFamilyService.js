import axios from "axios";

const BASE_URL = "http://localhost:8080/api/public";
axios.defaults.withCredentials = true;

export const getAllProductFamilies = async () => {
    try {
        const temp
            = await axios.get(`${BASE_URL}/product-families`);
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}

export const saveProductFamilies = async (productFamilies) => {
    try {
        const temp = await axios.post(`${BASE_URL}/product-families`, productFamilies);
        return temp.data;
    } catch (e) {
        e.message = "Không thể thêm mới loại sản phẩm";
        throw e;
    }
}

export const deleteProductFamilies = async (id) => {
    try {
        const temp = await axios.delete(`${BASE_URL}/product-families/${id}`);
        return temp.data;
    } catch (e) {
        e.message = "Không thể xóa loại sản phẩm!";
        throw e;
    }
}