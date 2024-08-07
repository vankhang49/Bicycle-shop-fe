import {FaEye, FaEyeSlash} from "react-icons/fa";
import spinner from "../../assets/icons/Spinner.gif";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import * as authenticationService from "../../core/services/AuthenticationService";
import {loginSuccess} from "../../core/redux/actions/AuthenticationActions";
import {toast} from "react-toastify";
import {LoginMain} from "./LoginMain";

export function RegisterForm() {
    const dispatch = useDispatch();
    const [openEye, setOpenEye] = useState(false);
    const [openEyeConfirm, setOpenEyeConfirm] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const [loginError, setLoginError] = useState('');
    const [validateError, setValidateError] = useState([])

    const {register, handleSubmit, formState: {errors}, setValue, getValues} = useForm({
        criteriaMode: "all"
    });

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
                }
            } catch (error) {
                setValidateError(error.errors);
                if (error.statusCode === 400) {
                    toast.error(error.message);
                }
                setIsLoading(false);
            }
        }, 2000)
    }

    return (
        <LoginMain showRegister={true} content={
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
                        />
                        <label>Email</label>
                    </div>
                    <p className={'validate'}>{errors.newEmail ? errors.newEmail.message : ""}</p>
                    {validateError && <p className="validate-error">{validateError.email}</p>}
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
                        />
                        {openEye ? <FaEye onClick={() => setOpenEye(!openEye)}></FaEye> :
                            <FaEyeSlash onClick={() => setOpenEye(!openEye)}></FaEyeSlash>}
                        <label>Mật khẩu</label>
                    </div>
                    <p className={'validate new-password'}>{errors.newPassword ? errors.newPassword.message : ""}</p>
                    {validateError && <p className="validate-error">{validateError.newPassword}</p>}
                    <div className="input-box">
                        <i className="fa-solid fa-lock icon"/>
                        <input type={openEye ? "text" : "password"} {...register("confirmPassword", {
                            validate: value => value === getValues('newPassword') || "Mật khẩu không trùng khớp!"
                        })}
                               className="login-input"
                               placeholder="Nhập lại mật khẩu"
                               id="password"
                        />
                        {openEyeConfirm ?
                            <FaEye onClick={() => setOpenEyeConfirm(!openEyeConfirm)}></FaEye> :
                            <FaEyeSlash onClick={() => setOpenEyeConfirm(!openEyeConfirm)}></FaEyeSlash>}
                        <label>Xác nhận mật khẩu</label>
                    </div>
                    <p className={'validate'}>{errors.confirmPassword ? errors.confirmPassword.message : ""}</p>
                    {validateError && <p className="validate-error">{validateError.confirmPassword}</p>}
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
                            <Link to={"/login"}>Đăng nhập</Link>
                        </p>
                    </div>
                </form>
            </div>
        }/>
    );
}