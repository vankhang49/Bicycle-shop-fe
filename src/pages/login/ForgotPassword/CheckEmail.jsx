import {useState} from "react";
import {useForm} from "react-hook-form";
import * as authenticationService from "../../../core/services/AuthenticationService";
import {toast} from "react-toastify";
import logo from "../../../assets/images/logo-bike.png";
import {Link, useNavigate} from "react-router-dom";
import spinner from "../../../assets/icons/Spinner.gif";
import FooterHome from "../../../components/Footer/FooterHome";


export default function CheckEmail() {
    const [validateError, setValidateError] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}, setValue, getValues} = useForm({
        criteriaMode: "all"
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const temp = await authenticationService.checkEmail(data);
            if (temp) {
                setTimeout(()=> {
                    setIsLoading(false);
                    navigate("/forgot-password", {state: {email: data.email}});
                }, 2000)
            }
        } catch (e) {
            if (e.status === 404) {
                toast.error(e.data);
            }
            else setValidateError(e.data.errors.errors);
        } finally {
            setTimeout(()=> {
                setIsLoading(false);
            }, 2000)
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
                        <div className="email form-element">
                            <p className="title-element">Nhập địa chỉ email: <span style={{color : "red"}}>*</span></p>
                            <div className="input-element ">
                                <input type="email" {...register("email", {
                                    required: "Email không được để trống!"
                                })} />
                                {errors.email && <p className="validate-error">{errors.email.message}</p>}
                                {validateError && <p className="validate-error">{validateError.email}</p>}
                            </div>
                        </div>

                        <div className="old-password form-element">
                            <p className="title-element">Số điện thoại: <span style={{color: "red"}}>*</span></p>
                            <div className="input-element ">
                                <input type='text'
                                       name="phoneNumber" {...register("phoneNumber", {
                                    required : "Số điện thoại không được để trống!",
                                    pattern : {value: /^(?:\+84|0)\d{9}/, message: "Số điện thoại phải bắt đầu bằng +84 hoặc 0 và kết thúc với 9 số!"}
                                })}/>
                                {errors.phoneNumber && <p className="validate-error">{errors.phoneNumber.message}</p>}
                                {validateError && <p className="validate-error">{validateError.oldPassword}</p>}
                            </div>
                        </div>
                        <div className="submit-info">
                            <button disabled={isLoading} type={"submit"}>{isLoading ?
                                <img src={spinner} alt="spinner"/> : "Gửi"}</button>
                        </div>
                    </form>
                </div>
            </div>
            <FooterHome/>
        </div>
    );
}