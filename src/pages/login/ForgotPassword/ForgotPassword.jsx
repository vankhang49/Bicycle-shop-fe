import logo from "../../../assets/images/logo-bike.png";
import {Link, useLocation, useNavigate} from "react-router-dom";
import FooterHome from "../../../components/Footer/FooterHome";
import "./ForgotPassword.scss";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import spinner from "../../../assets/icons/Spinner.gif";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import * as authenticationService from "../../../core/services/AuthenticationService";
import {toast} from "react-toastify";

export default function ForgotPassword() {
    const [validateError, setValidateError] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openEyeOne, setOpenEyeOne] = useState(false);
    const [openEyeTwo, setOpenEyeTwo] = useState(false);
    const navigate = useNavigate();
    const {state} = useLocation();
    const {register, handleSubmit, formState: {errors}, setValue, getValues} = useForm({
        criteriaMode: "all"
    });

    useEffect(()=> {
        setValue("email", state.email);
    }, [state.email]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const temp = await authenticationService.forgotPassword(data);
            if (temp.statusCode === 200) {
                setTimeout(()=> {
                    setIsLoading(false);
                    toast.success(temp.message);
                    navigate("/login");
                }, 2000)
            }
        } catch (e) {
            if (e.statusCode === 400) {
                setValidateError(e.errors.errors);
            }
            else toast.error(e.message)
        } finally {
            setTimeout(()=> {
                setIsLoading(false);
            }, 2000)
        }
    }

    const handleShowPassword = (data) => {
        if (data === 1) {
            setOpenEyeOne(!openEyeOne);
        }
        if (data === 2) {
            setOpenEyeTwo(!openEyeTwo);
        }
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
            <div id="forgotPassword">
                <div className="account-content">
                    <form className="form-operation" onSubmit={handleSubmit(onSubmit)}>
                        <div className="title form-element">
                            <h2>Quên mật khẩu</h2>
                        </div>
                        <div className="email-f form-element">
                            <p className="title-element">Địa chỉ email:</p>
                                <div className="input-element ">
                                    <input type="email" disabled {...register("email")} />
                                </div>
                        </div>
                        <div className="new-password form-element">
                            <p className="title-element">Mật khẩu mới: </p>
                            <div className="input-element ">
                                <input type={openEyeOne ? "text" : "password"}
                                       name="newPassword" {...register("newPassword", {
                                    required: "Mật khẩu không được để trống!",
                                    minLength: {value: 8, message: "Mật khẩu phải từ 8 đến 50 chữ!"},
                                    maxLength: {value: 50, message: "Mật khẩu phải từ 8 đến 50 chữ!"},
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%/*?&_])[A-Z][A-Za-z\d@$!%*?/&]{7,49}$/,
                                        message: "Mật khẩu phải bắt đầu bằng một chữ hoa, chứa ít nhất một chữ thường, một chữ số, ký tự đặc biệt (@$!%*?&/_), và phải dài từ 8 đến 50 ký tự!"
                                    }
                                })}/>
                                {openEyeOne ? <FaEye onClick={() => handleShowPassword(1)}/>
                                    : <FaEyeSlash onClick={() => handleShowPassword(1)}/>}
                                {errors.newPassword && <p className="validate-error">{errors.newPassword.message}</p>}
                                {validateError && <p className="validate-error">{validateError.newPassword}</p>}
                            </div>
                        </div>
                        <div className="confirm-password form-element">
                            <p className="title-element">Nhập lại mật khẩu: </p>
                            <div className="input-element ">
                                <input type={openEyeTwo ? "text" : "password"}
                                       name="confirmPassword" {...register("confirmPassword"
                                    , {
                                        validate: value => value === getValues('newPassword') || "Mật khẩu không trùng khớp!"
                                    })}/>
                                {openEyeTwo ? <FaEye onClick={() => handleShowPassword(2)}/>
                                    : <FaEyeSlash onClick={() => handleShowPassword(2)}/>}
                                {errors.confirmPassword &&
                                    <p className="validate-error">{errors.confirmPassword.message}</p>}
                                {validateError && <p className="validate-error">{validateError.confirmPassword}</p>}
                            </div>
                        </div>
                            <div className="submit-info">
                                <button disabled={isLoading} type={"submit"}>{isLoading ?
                                    <img src={spinner} alt="spinner"/> : "Lưu thay đổi"}</button>
                            </div>
                    </form>
                </div>
            </div>
            <FooterHome/>
        </div>
    );
}
