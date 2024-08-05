import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import {logoutAction} from "../redux/actions/AuthenticationActions";

const baseURL = "http://192.168.55.108:8080";
axios.defaults.withCredentials = true;

export const login = async (data) => {
    try {
        const loginData = {
            email: data.email,
            password: data.password,
        }
        const response = await axios.post(`${baseURL}/api/auth/authenticate`, loginData)
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const register = async (userData) => {
    try{
        const registerData = {
            newEmail: userData.newEmail,
            newPassword: userData.newPassword,
            confirmPassword: userData.confirmPassword
        }
        const response = await axios.post(`${baseURL}/api/auth/register`, registerData)
        return response.data;
    }catch(err){
        throw err;
    }
}

export const logout = async () => {
    try {
        const userId = localStorage.getItem("id");
        await axiosInstance.post(`logout?userId=${userId}`);
    } catch (e) {
        throw e;
    }
}

export const getYourProfile = async () => {
    try{
        const response = await axiosInstance.get(`get-profile`);
        console.log(response.data)
        return response.data;
    }catch(err){
        console.log(err);
    }
}

export const updatePasswordUser = async (userData, token) => {
    try{
        const response = await axiosInstance.put(`update-password`, userData);
        return response.data;
    }catch(err){
        console.log(err)
        err.message = "Vui lòng nhập đúng mật khẩu!"
        throw err;
    }
}

/**AUTHENTICATION CHECKER */

export const getRoles = async () => {
    try {
        const response = await axiosInstance.get(`${baseURL}/api/auth/user-role`)
        console.log(response.data)
        return response.data;
    } catch (e) {
        return [];
    }
}

export const isAdmin = async () =>{
    const roles = await getRoles();
    return roles.some(role => role.roleName === 'ROLE_ADMIN');
}
export const isCustomer = async () =>{
    const roles = await getRoles();
    return roles.some(role => role.roleName === 'ROLE_CUSTOMER');
}

export const isEmployee = async () =>{
    const roles = await getRoles();
    return roles.some(role => role.roleName === 'ROLE_EMPLOYEE');
}

export const isStoreManager = async () =>{
    const roles = await getRoles();
    return roles.some(role => role.roleName === 'ROLE_MANAGER');
}

export const adminOnly = () =>{
    return localStorage.getItem('isAuthenticated') && this.isAdmin();
}