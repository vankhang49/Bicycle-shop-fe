import "./UserInfo.scss";
import {useEffect, useState} from "react";
import * as authenticationService from "../../core/services/AuthenticationService";
import avatar from "../../assets/images/avatar.jpg";
import { TbReport } from "react-icons/tb";
import { MdModeEdit } from "react-icons/md";
import Moment from "moment";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {UploadOneImage} from "../../firebase/UploadImage";
import {toast} from "react-toastify";
import spinner from "../../assets/icons/Spinner.gif";

export function UserInfo() {
    const [userInfo, setUserInfo] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [isChangeAvatar, setIsChangeAvatar] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [validateError, setValidateError] = useState([]);
    const {register, handleSubmit, formState: {errors}, setValue} = useForm({
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
            setUserInfo(temp);
            setValue("userId", temp.userId);
            setValue("userCode", temp.userCode);
            setValue("fullName", temp.fullName);
            setValue("email", temp.email);
            setValue("phoneNumber", temp.phoneNumber);
            setValue("address", temp.address);
            setValue("gender", temp.gender);
            setValue("dateOfBirth", temp.dateOfBirth);
            setValue("dateCreate", temp.dateCreate);
            setValue("roles", temp.roles);
            setAvatarUrl(temp.avatar);
        }
    }

    const changeAvatar = async (email, url) => {
        try {
            const temp = await authenticationService.updateAvatar(email, url);
            setAvatarUrl(temp.avatar);
            toast.success("Cập nhật hình ảnh thành công!")
        } catch (e) {
            toast.error(e.message);
        }
    }

    const handleOpenEditInfo = () => {
        setIsEdit(!isEdit);
    }

    const onSubmit = async (data) => {
        try {
            const temp = await authenticationService.updateInfo(data);
            if (temp) {
                setUserInfo(temp);
                setValue("userId", temp.userId);
                setValue("userCode", temp.userCode);
                setValue("fullName", temp.fullName);
                setValue("email", temp.email);
                setValue("phoneNumber", temp.phoneNumber);
                setValue("address", temp.address);
                setValue("gender", temp.gender);
                setValue("dateOfBirth", temp.dateOfBirth);
                setValue("dateCreate", temp.dateCreate);
                setValue("roles", temp.roles);
                setAvatarUrl(temp.avatar);
            }
            toast.success("Cập nhật thông tin nguời dùng thành công!");
        } catch (e) {
            setValidateError(e.errors);
        }
    }

    const triggerFileInput = (inputClass) => {
        setIsLoading(true);
        document.querySelector(inputClass).click();
    };

    const handleOneImageUrlChange = async (uploadedImageUrl) => {
        await changeAvatar(userInfo.email, uploadedImageUrl);
        setIsChangeAvatar(true);
        setTimeout(()=> {
            setIsLoading(false);
        }, 2000)
    }

    const calculateDays = (value) => {
        const birthDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
        return age >= 18 || "Ngày sinh phải lớn hơn ngày hiện tại 18 năm!";
    }

    return(
        <div className="info-content">
                <form className="info-left" onSubmit={handleSubmit(onSubmit)}>
                    <div className="title">
                        <h2>Hồ sơ của tôi</h2>
                        <a onClick={handleOpenEditInfo}><MdModeEdit /></a>
                    </div>
                    <div className="full-name">
                        <p className="title-element">Họ và tên:</p>
                        {isEdit ?
                            <div className="input-element">
                                <input type="text" {...register("fullName", {
                                    required: "Tên không được để trống!",
                                    maxLength: {value: 50, message: "Tên nhân viên được quá 50 Ký tự!"},
                                    pattern: {
                                        value: /^[A-Za-zÀ-ỹà-ỹĂăÂâÊêÔôƠơƯưĐđ\s]+$/,
                                        message: "Tên không được chứa ký tự số và không được chứa ký tự đặc biệt!"
                                    }
                                })} />
                                {validateError && <p className="validate-error">{validateError.fullName}</p>}
                                {errors.fullName && <p className="validate-error">{errors.fullName.message}</p>}
                            </div>
                            :
                            <p>{userInfo.fullName}</p>
                        }
                    </div>
                    <div className="user-code">
                        <p className="title-element">Mã khách hàng:</p>
                        {isEdit ?
                            <div className="input-element">
                                <input type="text" disabled {...register("userCode")} />
                                {validateError && <p className="validate-error">{validateError.userCode}</p>}
                            </div>
                            :
                            <p>{userInfo.userCode}</p>
                        }
                    </div>
                    <div className="date-of-birth">
                        <p className="title-element">Ngày sinh:</p>
                        {isEdit ?
                            <div className="input-element">
                                <input type="date" {...register("dateOfBirth", {
                                    required: "Ngày sinh không được để trống!",
                                    validate : value => calculateDays(value)
                                })} />
                                {errors.dateOfBirth && <p className="validate-error">{errors.dateOfBirth.message}</p>}
                                {validateError && <p className="validate-error">{validateError.dateOfBirth}</p>}
                            </div>
                            :
                            <p>{Moment(userInfo.dateOfBirth).format("DD/MM/yyyy")}</p>
                        }
                    </div>
                    <div className="gender">
                        <p className="title-element">Giới tính:</p>
                        {isEdit ?
                            <div className="input-element">
                                <div className=" form-gender">
                                    {userInfo?.gender === 0 ?
                                        <input type="radio" checked {...register("gender")} value={0}/>
                                        : <input type="radio"{...register("gender", {
                                            required: "Giới tính không được để trống!"
                                        })} value={0}/>
                                    }
                                    <span>Nam</span>
                                    {userInfo?.gender === 1 ?
                                        <input type="radio" checked {...register("gender")} value={1}/>
                                        : <input type="radio"{...register("gender", {
                                            required: "Giới tính không được để trống!"
                                        })} value={1}/>
                                    }
                                    <span>Nữ</span>
                                    {userInfo?.gender === 2 ?
                                        <input type="radio" checked {...register("gender")} value={2}/>
                                        : <input type="radio"{...register("gender", {
                                            required: "Giới tính không được để trống!"
                                        })} value={2}/>
                                    }
                                    <span>Khác</span>
                                </div>
                                {errors.gender && <p className="validate-error">{errors.gender.message}</p>}
                            </div>

                            :
                            <p>
                                {userInfo.gender === 0 ? "Nam" : userInfo.gender === 1 ? "Nữ" : "Khác"}
                            </p>
                        }
                    </div>
                    <div className="date-create">
                        <p className="title-element">Ngày tạo tài khoản:</p>
                        {isEdit ?
                            <div className="input-element">
                                <input type="datetime-local" disabled {...register("dateCreate")} />
                                {validateError && <p className="validate-error">{validateError.dateCreate}</p>}
                            </div>
                            :
                            <p>{Moment(userInfo.dateCreate).format("DD/MM/yyyy")}</p>
                        }
                    </div>
                    <div className="email">
                        <p className="title-element">Địa chỉ email:</p>
                        {isEdit ?
                            <div className="input-element">
                                <input type="email" disabled {...register("email", {
                                    required: "Email không được để trống!"
                                })} />
                                {validateError && <p className="validate-error">{validateError.email}</p>}
                            </div>
                            :
                            <p>{userInfo.email}</p>
                        }
                    </div>
                    <div className="phone-number">
                        <p className="title-element">Số điện thoại:</p>
                        {isEdit ?
                            <div className="input-element">
                                <input type="text" {...register("phoneNumber", {
                                    required : "Số điện thoại không được để trống!",
                                    pattern : {value: /^(?:\+84|0)\d{9}/, message: "Số điện thoại phải bắt đầu bằng +84 hoặc 0 và kết thúc với 9 số!"}
                                })} />
                                {errors.phoneNumber && <p className="validate-error">{errors.phoneNumber.message}</p>}
                                {validateError && <p className="validate-error">{validateError.phoneNumber}</p>}
                            </div>
                            :
                            <p>{userInfo.phoneNumber}</p>
                        }
                    </div>
                    <div className="address">
                        <p className="title-element">Địa chỉ:</p>
                        {isEdit ?
                            <div className="input-element">
                                <input type="text" {...register("address", {
                                    required : "Địa chỉ không được để trống!"
                                })} />
                                {errors.address && <p className="validate-error">{errors.address.message}</p>}
                                {validateError && <p className="validate-error">{validateError.address}</p>}
                            </div>
                            :
                            <p>{userInfo.address}</p>
                        }
                    </div>
                    {isEdit &&
                        <div className="submit-info">
                            <button type={"submit"}>Xác nhận</button>
                        </div>
                    }
                </form>
                <div className="function-right">
                    <div className="avatar">
                        {avatarUrl ?
                            <img src={avatarUrl} alt="avatar"/>
                            :
                            <img src={avatar} alt="avatar"/>
                        }
                        <button onClick={() => triggerFileInput(".addAvatar")}>
                            {isLoading ? <img src={spinner} alt="spinner"/> : "Chọn ảnh"}
                        </button>
                        <div className="post-ad">
                            <UploadOneImage className='addAvatar'
                                            onImageUrlChange={(url) => handleOneImageUrlChange(url)}
                            />
                        </div>
                    </div>
                    <Link to="/my-info/bill" className="bill">
                        <div className="purchased-order">
                            <TbReport/>
                        </div>
                        <span>Đơn hàng</span>
                    </Link>
                </div>
            </div>
    );
}