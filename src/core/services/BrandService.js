import axios from "axios";

const BASE_URL = "https://bicycle-shop-be.onrender.com/api/public";
axios.defaults.withCredentials = true;

export const getAllBrand = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/brands`);
        return response.data;
    } catch (e) {
        return [];
    }
}

export const getAllBrandByCategoryName = async (categoryName) => {
    try {
        const response = await axios.get(`${BASE_URL}/brands/${categoryName}`);
        console.log(response.data);
        return response.data;
    } catch (e) {
        return [];
    }
}

export const saveBrand = async (brand) => {
    try {
        const response = await axios.post(`${BASE_URL}/brands`, brand);
        console.log(response.data);
        return response.data;
    } catch (e) {
        e.message = "Không thể thêm mới thương hiệu!";
        throw e;
    }
}

export const deleteBrand = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/brands/${id}`);
        return response.data;
    } catch (e) {
        e.message = "Không thể xóa thương hiệu!";
        throw e;
    }
}
