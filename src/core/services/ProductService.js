import axios from "axios";

const BASE_URL = "http://localhost:8080/api/public";
axios.defaults.withCredentials = true;

export async function getAllProducts(page, nameSearch, familyName, categoryName, brandName) {
    try {
        const temp
            = await axios.get(`${BASE_URL}/products?page=${page}&nameSearch=${nameSearch}` +
            `&familyName=${familyName}&categoryName=${categoryName}&brandName=${brandName}`);
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}

export async function getProductAndPricingById(productId) {
    try {
        const temp = await axios.get(`${BASE_URL}/products/detail/${productId}`);
        console.log(temp.data)
        return temp.data.product;
    } catch (e) {
        throw new Error("Không tìm thấy sản phẩm!")
    }
}

export const saveProduct= async (product) => {
    try {
        const temp = await axios.post(`${BASE_URL}/products`, product);
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        throw new Error("Không thể thêm mới!")
    }

}

export const updateProduct= async (product) => {
    try {
        const temp = await axios.put(`${BASE_URL}/products`, product);
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        throw new Error("Không thể cập nhật!")
    }
}

export const findProductById = async (id) => {
    try {
        const temp = await axios.get(`${BASE_URL}/products/${id}`);
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        throw new Error("Không tìm thấy kết quả!")
    }
}
