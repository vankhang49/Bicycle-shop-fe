import axiosInstance from "../../utils/axiosInstance";

export const getAllCustomer = async (searchContent, page) => {
    try {
        const temp = await axiosInstance.get(`/users/customer?userCode=${searchContent}` +
        `&fullName=${searchContent}&page=${page}`);
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        throw e.response.data;
    }
}