import "./login.scss"
import {useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import * as authenticationService from "../../core/services/AuthenticationService";
import {toast} from "react-toastify";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import spinner from "../../assets/icons/Spinner.gif";
import FooterHome from "../../components/Footer/FooterHome";

export function Login() {
    const isAuthenticated = !!localStorage.getItem("isAuthenticated");
    const [openEye, setOpenEye] = useState(false);
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    const {register, handleSubmit, formState: {errors}, setValue} = useForm({
        criteriaMode: "all"
    });
    const [showPopupElement, setShowPopupElement] = useState(false);

    useEffect(() => {
        checkRememberMe();
    }, []);

    useEffect(() => {
        setTimeout(function () {
            setShowPopupElement(false);
        }, 3000);
    }, [showPopupElement]);

    const checkRememberMe = () => {
        let rememberMe =  JSON.parse(localStorage.getItem("rememberMe"));
        if (rememberMe === undefined) {
            rememberMe = authenticationService.getRemember();
        }
        if (rememberMe?.remember === true) {
            setValue("email", rememberMe.email);
            setValue("rememberMe", rememberMe.remember);
        }
    }

    const onSubmit = async (data) => {
        const remember = data.rememberMe;
        setIsLoading(true);
        setTimeout(async () => {
            try {
                const userData = await authenticationService.login(data);
                setIsLoading(false);
                if (userData.token) {
                    localStorage.setItem("id", userData.userId);
                    localStorage.setItem('token', userData.token);
                    localStorage.setItem('fullName', userData.fullName);
                    localStorage.setItem('isAuthenticated', "authenticated");
                    localStorage.setItem('lastTime', new Date().toISOString());
                    if (remember) {
                        authenticationService.setRemember(data.email);
                    } else {
                        authenticationService.setDefaultRemember();
                        localStorage.removeItem("rememberMe");
                    }
                    navigate("/Bicycle-shop-fe");
                    toast.success("Đăng nhập thành công!");
                } else {
                    setLoginError(userData.message);
                    setShowPopupElement(true);
                }
            } catch (error) {
                toast.error(error.message);
                setIsLoading(false);
            }
        }, 2000)
    }

    if (isAuthenticated) {
        return <Navigate to="/"/>
    }

    return (
        <div>
            <div className="login-page">
                <div className="form-box">
                    <div className="form-value">
                        <form onSubmit={handleSubmit(onSubmit)} id="form_input">
                            <h2>Login</h2>
                            {showPopupElement &&
                                <div className="popup">
                                    <p className="validate-error">
                                        {loginError}
                                    </p>
                                </div>
                            }
                            <div className="input-box">
                                <i className="fa-regular fa-envelope icon"/>
                                <input type="text" {...register("email")}
                                       className="login-input"
                                       placeholder="Địa chỉ email"
                                       id="email"
                                       style={showPopupElement ? {border: "1px solid #DA1075FF"} : {}}
                                />
                                <label>Email</label>
                                {errors.username &&
                                    <p style={{color: "red", fontSize: "16px"}}>{errors.username.message}</p>}
                            </div>
                            <div className="input-box">
                                <i className="fa-solid fa-lock icon"/>
                                <input type={openEye ? "text" : "password"} {...register("password")}
                                       className="login-input"
                                       placeholder="Mật khẩu"
                                       id="password"
                                       style={showPopupElement ? {border: "1px solid #DA1075FF"} : {}}
                                />
                                {openEye ? <FaEye onClick={() => setOpenEye(!openEye)}></FaEye> :
                                    <FaEyeSlash onClick={() => setOpenEye(!openEye)}></FaEyeSlash>}
                                <label>Password</label>
                                {errors.password &&
                                    <p style={{color: "red", fontSize: "16px"}}>{errors.password.message}</p>}
                            </div>
                            <div className="forget">
                                <label htmlFor="">
                                    <input type="checkbox" {...register("rememberMe")}/>
                                    Remember Me
                                    <a href="#">Forget password</a>
                                </label>
                            </div>
                            <button type={"submit"} disabled={isLoading}
                                    style={isLoading ? {background: "#ccc"} : null} className="btn bkg">
                                {isLoading ?
                                    <img src={spinner} alt="spinner"/>
                                    :
                                    "Đăng nhập"
                                }
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
            <FooterHome/>
        </div>

    );
}