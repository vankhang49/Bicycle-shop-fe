import "./login.scss"
import {useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import * as authenticationService from "../../core/services/AuthenticationService";
import {toast} from "react-toastify";

export function Login() {
    const isAuthenticated = authenticationService.isAuthenticated();
    const [openEye, setOpenEye] = useState(false);
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('')
    const {register, handleSubmit, formState: {errors}, setValue} = useForm({
        criteriaMode: "all"
    });
    const [showPopupElement, setShowPopupElement] = useState(false);

    // useEffect(() => {
    //     checkRememberMe();
    // }, []);
    //
    // useEffect(() => {
    //     setTimeout(function () {
    //         setShowPopupElement(false);
    //     }, 3000);
    // }, [showPopupElement]);
    //
    // const checkRememberMe = () => {
    //     let rememberMe =  JSON.parse(localStorage.getItem("rememberMe"));
    //     if (rememberMe === undefined) {
    //         rememberMe = authenticationService.getRemember();
    //     }
    //     if (rememberMe?.remember === true) {
    //         setValue("email", rememberMe.email);
    //         setValue("rememberMe", rememberMe.remember);
    //     }
    // }

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const userData = await authenticationService.login(data);
            if (userData.token) {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('fullName', userData.fullName);
                localStorage.setItem('lastTime', new Date().toISOString());
                navigate("/");
                toast.success("Đăng nhập thành công!");
            } else {
                setLoginError(userData.message);
                setShowPopupElement(true);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const closePopup = () => {

    }

    return (
        <div className="login-page">
            <div className="form-box">
                <div className="form-value">
                    <form onSubmit={handleSubmit(onSubmit)} id="form_input">
                        <h2>Login</h2>
                        <div className="input-box">
                            <i className="fa-regular fa-envelope icon"/>
                            <input type="text" {...register("email")}
                                   className="login-input"
                                   placeholder="Địa chỉ email"
                                   id="email"
                            />
                            <label>Email</label>
                        </div>
                        <div className="input-box">
                            <i className="fa-solid fa-lock icon"/>
                            <input type={"password"} {...register("password")}
                                   className="login-input"
                                   placeholder="Mật khẩu"
                                   id="password"
                                   />
                            <label>Password</label>

                        </div>
                        <div className="forget">
                            <label htmlFor="">
                                <input type="checkbox" {...register("rememberMe")}/>
                                Remember Me
                                <a href="#">Forget password</a>
                            </label>
                        </div>
                        <button type="submit" name="submit">
                            Đăng nhập
                        </button>
                        <div className="register">
                            <p>
                                Bạn chưa có tài khoản
                                <a href="">Đăng ký</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}