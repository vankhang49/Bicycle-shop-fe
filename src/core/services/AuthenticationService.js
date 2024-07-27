import axios from "axios";
import {jwtDecode} from "jwt-decode";
import axiosInstance from "../../utils/axiosInstance";

const baseURL = "http://localhost:8080";

const rememberMe = {
    "remember" : false,
    "username" : ""
}

export const setRemember = (data) => {
    rememberMe.remember = true;
    rememberMe.username = data;
    localStorage.setItem("rememberMe", JSON.stringify(rememberMe));
}

export const setDefaultRemember = () => {
    rememberMe.remember = false;
    rememberMe.username = "";
}

export const getRemember = () => {
    return rememberMe;
}

export const login = async (data) => {
    try {
        const response = await axios.post(`${baseURL}/api/auth/authenticate`, data)
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const register = async (userData) => {
    try{
        const response = await axios.post(`${baseURL}/api/auth/register`, userData)
        return response.data;
    }catch(err){
        throw err;
    }
}

export const getYourProfile = async (token) => {
    try{
        const response = await axiosInstance.get(`get-profile`);
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
export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('fullName')

}

export const isAuthenticated = () =>{
    const token = localStorage.getItem('token');
    return !!token
}

export const isAdmin = () =>{
    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token);
    return decodedToken.roles === 'ROLE_ADMIN';
}

export const isCustomer = () =>{
    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token);
    return decodedToken.roles === 'ROLE_CUSTOMER';
}

export const isEmployee = () =>{
    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token);
    return decodedToken.roles === 'ROLE_EMPLOYEE';
}

export const isStoreManager = () =>{
    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token);
    return decodedToken.roles === 'ROLE_MANAGER';
}

export const adminOnly = () =>{
    return this.isAuthenticated() && this.isAdmin();
}