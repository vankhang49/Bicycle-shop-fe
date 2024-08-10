import {Main} from "../../components/Main/Main";
import {MdModeEdit} from "react-icons/md";
import "./AccountAndPassword.scss";
import * as authenticationService from "../../core/services/AuthenticationService";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import spinner from "../../assets/icons/Spinner.gif";

export function AccountAndPassword() {
    const [email, setEmail] = useState("");
    const [validateError, setValidateError] = useState([]);
    const [openEyeOne, setOpenEyeOne] = useState(false);
    const [openEyeTwo, setOpenEyeTwo] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openEyeThree, setOpenEyeThree] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const {register, handleSubmit, formState: {errors}, setValue, getValues} = useForm({
        criteriaMode: "all"
    });

    useEffect(() => {
        const fetchData = async () => {
            await getUserInfo();
        }
        fetchData();
    }, []);

    const getUserInfo = async () => {
        const temp = await authenticationService.getYourProfile();
        if (temp) {
            const arrEmail = temp.email.split('');
            arrEmail.forEach((item, index) => {
                if (index > 0 && index < 9) {
                    arrEmail[index] = "*"; // Sửa phần tử trong mảng trực tiếp
                }
            });
            const hideEmail = arrEmail.join('');
            setEmail(hideEmail);
        }
    }

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const temp = await authenticationService.updatePasswordUser(data);
            if (temp.statusCode === 200) {
                toast.success(temp.message);
            }
        } catch (e) {
            setValidateError(e.errors);
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
        if (data === 3) {
            setOpenEyeThree(!openEyeThree);
        }
    }

    const handleOpenChangePassword = () => {
        setIsEdit(!isEdit);
    }

    return(
        <Main content={
            <div id="accountAndPassword">
                <div className="account-content">
                    <form className="form-operation" onSubmit={handleSubmit(onSubmit)}>
                        <div className="title form-element">
                            <h2>Tài khoản và mật khẩu</h2>
                            <a onClick={handleOpenChangePassword}><MdModeEdit/></a>
                        </div>
                        <div className="email form-element">
                            <p className="title-element">Địa chỉ email:</p>
                            {isEdit ?
                                <div className="input-element ">
                                    <input type="email" {...register("email", {
                                        required: "Email không được để trống!"
                                    })} />
                                    {errors.email && <p className="validate-error">{errors.email.message}</p>}
                                    {validateError && <p className="validate-error">{validateError.email}</p>}
                                </div>
                                :
                                <p className='email-value'>{email}</p>
                            }
                        </div>

                        <div className="old-password form-element">
                            <p className="title-element">Mật khẩu cũ: </p>
                            <div className="input-element ">
                                <input type={openEyeOne ? "text" : "password"} disabled={!isEdit}
                                       name="oldPassword" {...register("oldPassword", {
                                    required: "Mật khẩu không được để trống"
                                })}/>
                                {openEyeOne ? <FaEye onClick={() => handleShowPassword(1)}/>
                                    : <FaEyeSlash onClick={() => handleShowPassword(1)}/>}
                                {errors.oldPassword && <p className="validate-error">{errors.oldPassword.message}</p>}
                                {validateError && <p className="validate-error">{validateError.oldPassword}</p>}
                            </div>
                        </div>
                        <div className="new-password form-element">
                            <p className="title-element">Mật khẩu mới: </p>
                            <div className="input-element ">
                                <input type={openEyeTwo ? "text" : "password"} disabled={!isEdit}
                                       name="newPassword" {...register("newPassword", {
                                    required: "Mật khẩu không được để trống!",
                                    minLength: {value: 8, message: "Mật khẩu phải từ 8 đến 50 chữ!"},
                                    maxLength: {value: 50, message: "Mật khẩu phải từ 8 đến 50 chữ!"},
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%/*?&_])[A-Z][A-Za-z\d@$!%*?/&]{7,49}$/,
                                        message: "Mật khẩu phải bắt đầu bằng một chữ hoa, chứa ít nhất một chữ thường, một chữ số, ký tự đặc biệt (@$!%*?&/_), và phải dài từ 8 đến 50 ký tự!"
                                    }
                                })}/>
                                {openEyeTwo ? <FaEye onClick={() => handleShowPassword(2)}/>
                                    : <FaEyeSlash onClick={() => handleShowPassword(2)}/>}
                                {errors.newPassword && <p className="validate-error">{errors.newPassword.message}</p>}
                                {validateError && <p className="validate-error">{validateError.newPassword}</p>}
                            </div>
                        </div>
                        <div className="confirm-password form-element">
                            <p className="title-element">Nhập lại mật khẩu: </p>
                            <div className="input-element ">
                                <input type={openEyeThree ? "text" : "password"} disabled={!isEdit}
                                       name="confirmPassword" {...register("confirmPassword"
                                    , {
                                        validate: value => value === getValues('newPassword') || "Mật khẩu không trùng khớp!"
                                    })}/>
                                {openEyeThree ? <FaEye onClick={() => handleShowPassword(3)}/>
                                    : <FaEyeSlash onClick={() => handleShowPassword(3)}/>}
                                {errors.confirmPassword &&
                                    <p className="validate-error">{errors.confirmPassword.message}</p>}
                                {validateError && <p className="validate-error">{validateError.confirmPassword}</p>}
                            </div>
                        </div>
                        {isEdit &&
                            <div className="submit-info">
                                <button disabled={isLoading} type={"submit"}>{isLoading ? <img src={spinner} alt="spinner"/> : "Lưu thay đổi"}</button>
                            </div>
                        }
                    </form>
                </div>
            </div>
        }/>
    );
}