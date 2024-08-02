import "./UserInfo.scss";
import {Main} from "../../components/Main/Main";
import {useEffect, useState} from "react";
import {getYourProfile} from "../../core/services/AuthenticationService";
import * as authenticationService from "../../core/services/AuthenticationService";
import avatar from "../../assets/images/avatar.jpg";
import { TbReport } from "react-icons/tb";
import { MdModeEdit } from "react-icons/md";
import Moment from "moment";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";

export function UserInfo() {
    const [userInfo, setUserInfo] = useState({});
    const [isEdit, setIsEdit] = useState(false);
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
        }
    }

    const handleOpenEditInfo = () => {
        setIsEdit(!isEdit);
    }

    const onSubmit = async (data) => {

    }

    return(
        <Main content={
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
                                <input type="text" {...register("fullName")} />
                                <span className={"validate"}></span>
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
                                <span className={"validate"}></span>
                            </div>
                            :
                            <p>{userInfo.userCode}</p>
                        }
                    </div>
                    <div className="date-of-birth">
                        <p className="title-element">Ngày sinh:</p>
                        {isEdit ?
                            <div className="input-element">
                                <input type="date" {...register("dateOfBirth")} />
                                <span className={"validate"}></span>
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
                                <span className={"validate"}></span>
                            </div>
                            :
                            <p>{Moment(userInfo.dateCreate).format("DD/MM/yyyy")}</p>
                        }
                    </div>
                    <div className="email">
                        <p className="title-element">Địa chỉ email:</p>
                        {isEdit ?
                            <div className="input-element">
                                <input type="email" disabled {...register("email")} />
                                <span className={"validate"}></span>
                            </div>
                            :
                            <p>{userInfo.email}</p>
                        }
                    </div>
                    <div className="phone-number">
                        <p className="title-element">Số điện thoại:</p>
                        {isEdit ?
                            <div className="input-element">
                                <input type="text" {...register("phoneNumber")} />
                                <span className={"validate"}></span>
                            </div>
                            :
                            <p>{userInfo.phoneNumber}</p>
                        }
                    </div>
                    <div className="address">
                        <p className="title-element">Địa chỉ:</p>
                        {isEdit ?
                            <div className="input-element">
                                <input type="text" {...register("address")} />
                                <span className={"validate"}></span>
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
                        {userInfo.avatar ?
                            <img src={userInfo.avatar} alt="avatar"/>
                            :
                            <img src={avatar} alt="avatar"/>
                        }
                        <button>Chọn ảnh</button>
                    </div>
                    <Link to="/my-info/bill" className="bill">
                        <div className="purchased-order">
                            <TbReport />
                        </div>
                        <span>Đơn hàng</span>
                    </Link>
                </div>
            </div>
        }/>
    );
}