import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import * as authenticationService from "../../core/services/AuthenticationService";
import {loginSuccess, setRemember} from "../../core/redux/actions/AuthenticationActions";
import {toast} from "react-toastify";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import spinner from "../../assets/icons/Spinner.gif";
import {LoginMain} from "./LoginMain";

export function LoginForm() {
    const dispatch = useDispatch();
    const rememberMe = useSelector(state => state.auth.rememberMe);
    const [openEye, setOpenEye] = useState(false);
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    const {register, handleSubmit, formState: {errors}, setValue, getValues} = useForm({
        criteriaMode: "all"
    });

    const [showPopupElement, setShowPopupElement] = useState(false);

    useEffect(() => {
        checkRememberMe();
    }, []);

    useEffect(() => {
        setTimeout(function () {
            setShowPopupElement(false);
        }, 2000);
    }, [showPopupElement]);

    const checkRememberMe = () => {
        if (rememberMe) {
            setValue("email", localStorage.getItem("rememberMeEmail"));
            setValue("rememberMe", rememberMe);
        }
    }

    const onSubmit = async (data) => {
        const remember = data.rememberMe;
        setIsLoading(true);
        console.log(data)
        setTimeout(async () => {
            try {
                const userData = await authenticationService.login(data);
                setIsLoading(false);
                if (userData.token) {
                    dispatch(loginSuccess(userData));
                    localStorage.setItem("id", userData.userId);
                    localStorage.setItem('fullName', userData.fullName);
                    localStorage.setItem('avatar', userData.avatar);
                    localStorage.setItem('isAuthenticated', 'true');
                    localStorage.setItem('lastTime', new Date().toISOString());
                    if (remember) {
                        localStorage.setItem("rememberMe", "true")
                        localStorage.setItem("rememberMeEmail", data.email);
                        dispatch(setRemember(true));
                    } else {
                        localStorage.removeItem("rememberMeEmail");
                        dispatch(setRemember(false));
                        localStorage.removeItem("rememberMe");
                    }
                    navigate("/");
                    toast.success("Đăng nhập thành công!");
                } else {
                    setLoginError(userData.message);
                    setShowPopupElement(true);
                }
            } catch (error) {
                setLoginError(error);
                setShowPopupElement(true);
                setIsLoading(false);
            }
        }, 2000)
    }


    return (
        <LoginMain showRegister={false} content={
            <div className="form-value back">
                <form onSubmit={handleSubmit(onSubmit)} id="form_input" className={"back-content"}>
                    <h2>Đăng nhập</h2>
                    {showPopupElement &&
                        <div className="popup">
                            <p className="validate-error">
                                {loginError}
                            </p>
                        </div>
                    }
                    <div className="input-box">
                        <i className="fa-regular fa-envelope icon"/>
                        <input type="email" {...register("email", {
                            required: "Email không được để trống!"
                        })}
                               className="login-input"
                               placeholder="Địa chỉ email"
                               id="email"
                               style={showPopupElement ? {border: "1px solid #DA1075FF"} : {}}
                        />
                        <label>Email</label>
                    </div>
                    <p className={'validate'}>{errors.email ? errors.email.message : ""}</p>
                    <div className="input-box">
                        <i className="fa-solid fa-lock icon"/>
                        <input type={openEye ? "text" : "password"} {...register("password", {
                            required: "Mật khẩu không được để trống!"
                        })}
                               className="login-input"
                               placeholder="Mật khẩu"
                               id="password"
                               style={showPopupElement ? {border: "1px solid #DA1075FF"} : {}}
                        />
                        {openEye ? <FaEye onClick={() => setOpenEye(!openEye)}></FaEye> :
                            <FaEyeSlash onClick={() => setOpenEye(!openEye)}></FaEyeSlash>}
                        <label>Mật khẩu</label>
                    </div>
                    <p className={'validate'}>{errors.password ? errors.password.message : ""}</p>
                    <div className="forget">
                        <label htmlFor="">
                            <input type="checkbox" {...register("rememberMe")}/>
                            Ghi nhớ đăng nhập
                            <a href="#">Quên mật khẩu</a>
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
                            <Link to={'/register'}>Đăng ký</Link>
                        </p>
                    </div>
                </form>
            </div>
        }/>
    );
}