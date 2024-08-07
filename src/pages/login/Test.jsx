import "./login.scss"
import {useEffect, useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import * as authenticationService from "../../core/services/AuthenticationService";
import {toast} from "react-toastify";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import spinner from "../../assets/icons/Spinner.gif";
import FooterHome from "../../components/Footer/FooterHome";
import {useDispatch, useSelector} from "react-redux";
import {loginSuccess, setRemember} from "../../core/redux/actions/AuthenticationActions";
import logo from "../../assets/images/logo-bike.png";

export function Test() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const rememberMe = useSelector(state => state.auth.rememberMe);
    const [openEye, setOpenEye] = useState(false);
    const [openEyeConfirm, setOpenEyeConfirm] = useState(false);
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const [isShowRegister, setIsShowRegister] = useState(false);

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
        }, 3000);
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
                toast.error(error.message);
                setIsLoading(false);
            }
        }, 2000)
    }

    const onSubmitRegister = async (data) => {
        setIsLoading(true);
        console.log(data)
        setTimeout(async () => {
            try {
                const userData = await authenticationService.register(data);
                setIsLoading(false);
                if (userData.token) {
                    dispatch(loginSuccess(userData));
                    localStorage.setItem("id", userData.userId);
                    localStorage.setItem('fullName', userData.fullName);
                    localStorage.setItem('isAuthenticated', 'true');
                    localStorage.setItem('lastTime', new Date().toISOString());
                    navigate("/");
                    toast.success("Đăng ký thành công!");
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
            <div className="login-header">
                <div className="left">
                    <div className="logo">
                        <img src={logo} alt="logo"/>
                    </div>
                </div>
                <div className="middle">

                </div>
                <div className="right">
                    <div className="link-back">
                        <Link to='/'>Quay lại trang chủ</Link>
                    </div>
                </div>
            </div>
            <div className="login-page">
                <div className={isShowRegister ? "form-box show-register" : "form-box"}>
                    <div className="content">
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
                                        <a onClick={() => setIsShowRegister(!isShowRegister)}>Đăng ký</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                        <div className="form-value front">
                            <div className="img">
                                <div className="circle">
                                </div>
                                <div className="circle" id="right">
                                </div>
                                <div className="circle" id="bottom">
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(onSubmitRegister)} id="form_input" className={"front-content"}>
                                <h2>Đăng ký</h2>
                                <div className="input-box">
                                    <i className="fa-regular fa-envelope icon"/>
                                    <input type="email" {...register("newEmail", {
                                        required: "Email không được để trống!"
                                    })}
                                           className="login-input"
                                           placeholder="Địa chỉ email"
                                           id="email"
                                           style={showPopupElement ? {border: "1px solid #DA1075FF"} : {}}
                                    />
                                    <label>Email</label>
                                </div>
                                <p className={'validate'}>{errors.newEmail ? errors.newEmail.message : ""}</p>
                                <div className="input-box">
                                    <i className="fa-solid fa-lock icon"/>
                                    <input type={openEye ? "text" : "password"} {...register("newPassword", {
                                        required: "Mật khẩu không được để trống!",
                                        minLength: {value: 8, message: "Mật khẩu phải từ 8 đến 50 chữ!"},
                                        maxLength: {value: 50, message: "Mật khẩu phải từ 8 đến 50 chữ!"},
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&/_])[A-Z][A-Za-z\d@$!%*?&]{7,49}$/,
                                            message: "Mật khẩu phải bắt đầu bằng một chữ hoa, chứa ít nhất một chữ thường, một chữ số, ký tự đặc biệt (@$!%*?&/_), và phải dài từ 8 đến 50 ký tự!"
                                        }
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
                                <p className={'validate'}>{errors.newPassword ? errors.newPassword.message : ""}</p>
                                <div className="input-box">
                                    <i className="fa-solid fa-lock icon"/>
                                    <input type={openEye ? "text" : "password"} {...register("confirmPassword", {
                                        validate: value => value === getValues('newPassword') || "Mật khẩu không trùng khớp!"
                                    })}
                                           className="login-input"
                                           placeholder="Nhập lại mật khẩu"
                                           id="password"
                                           style={showPopupElement ? {border: "1px solid #DA1075FF"} : {}}
                                    />
                                    {openEyeConfirm ?
                                        <FaEye onClick={() => setOpenEyeConfirm(!openEyeConfirm)}></FaEye> :
                                        <FaEyeSlash onClick={() => setOpenEyeConfirm(!openEyeConfirm)}></FaEyeSlash>}
                                    <label>Xác nhận mật khẩu</label>
                                </div>
                                <p className={'validate'}>{errors.confirmPassword ? errors.confirmPassword.message : ""}</p>
                                <button type={"submit"} disabled={isLoading}
                                        style={isLoading ? {background: "#ccc"} : null} className="btn bkg">
                                    {isLoading ?
                                        <img src={spinner} alt="spinner"/>
                                        :
                                        "Đăng ký"
                                    }
                                </button>
                                <div className="register">
                                    <p>
                                        Đã có tài khoản
                                        <a onClick={() => setIsShowRegister(!isShowRegister)}>Đăng nhập</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <FooterHome/>
        </div>

    );
}