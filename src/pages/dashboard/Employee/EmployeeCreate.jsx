import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import * as userService from "../../../core/services/UserService";
import {useParams} from "react-router-dom";
import spinner from "../../../assets/icons/Spinner.gif";
import {DashboardMain} from "../../../components/DashboardMain/DashboardMain";
import * as roleService from "../../../core/services/RoleService";
import "./EmployeeCreate.scss";

export function EmployeeCreate() {
    const {id} = useParams();
    const [employee, setEmployee] = useState(null);
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const [roles, setRoles] = useState([]);
    const [rolesError, setRolesError] = useState(null);
    const [validateError, setValidateError] = useState([]);
    const [addRoles, setAddRoles] = useState([]);
    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        criteriaMode: "all"
    });

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                // Fetch employee data by id and set form values
                await getEmpById(id);
            }
            await getRoleList();
        }
        fetchData();
    }, [id])

    const getEmpById = async (id) => {
        const temp = await userService.getUserById(id);
        if (temp) {
            setEmployee(temp);
            setValue("userId", temp.userId);
            setValue("username", temp.username);
            setValue("userCode", temp.userCode);
            setValue("fullName", temp.fullName);
            setValue("gender", temp.gender);
            setValue("dateOfBirth", temp.dateOfBirth);
            setValue("dateCreate", temp.dateCreate);
            setValue("phoneNumber", temp.phoneNumber);
            setValue("email", temp.email);
            setValue("address", temp.address);
            setValue("roles", JSON.stringify(temp.roles));
            setAddRoles(temp.roles);
            if (id !== undefined) {
                setValue("accountNonExpired", temp.accountNonExpired);
                setValue("accountNonLocked", temp.accountNonLocked);
                setValue("credentialsNonExpired", temp.credentialsNonExpired);
                setValue("enabled", temp.enabled);
            }
        }
    }

    const getRoleList = async () => {
        const temp = await roleService.getAllRoles();
        setRoles(temp);
    }

    const onSubmit = async (data) => {
        try {
            if (addRoles.length < 1) {
                setRolesError("Chức vụ không được bỏ trống!")
                return;
            } else {
                setRolesError(null);
            }
            setIsLoading(true);
            const now = Date.now();
            data.roles = addRoles;
            data.gender = Number.parseInt(data.gender);
            if (id !== undefined) {
                data.enabled = JSON.parse(data.enabled);
            }
            let response;
            console.log(data)
            if (id) {
                response = await userService.updateUser(id, data);
            } else {
                response = await userService.saveUser(data);
            }
            if (response.statusCode === 200) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (e) {
            setValidateError(e.errors);
            if (e.statusCode === 400) {
                toast.error(e.message);
            }
        } finally {
            setTimeout(function () {
                setIsLoading(false);
            }, 2000);
        }

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

    const handleAddRoles = (event) => {
        if (event.target.value === "") {
            return;
        }
        const role = JSON.parse(event.target.value);
        if (!addRoles.some(r => r.roleName === role.roleName)) {
            setAddRoles(prevRoles => [...prevRoles, role]);
        }
    }

    const handlePopRole = (role) => {
        const parsedRole = JSON.parse(role);
        setAddRoles(prevRoles => prevRoles.filter(r => r.roleName !== parsedRole.roleName));
    }

    return (
        <DashboardMain path={'employees'} content={
            <div id="create-edit-user">
                <form className="content-element" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-title">
                        <p className="title">{id === undefined ? "Thêm mới" : "Cập nhật"} nhân viên</p>
                    </div>
                    <div className="flex-content">
                        <div className="form-operation">
                            <div className="form-element">
                                <label>
                                    <span className={"element-title"}>Mã nhân viên:
                                        <span style={{color: "red"}}> *</span>
                                    </span>
                                </label>
                                <input type="text"  {...register("userCode", {
                                    required: "Mã nhân viên không được để trống!",
                                    pattern: {value: /^NV\d{4}$/, message: "Mã nhân viên phải được bắt đầu bằng NV và kết thúc với 4 chữ số!"}
                                })} />
                                {errors.userCode && <p className="validate-error">{errors.userCode.message}</p>}
                                {validateError && <p className="validate-error">{validateError.userCode}</p>}
                            </div>
                            <div className="form-element">
                                <label>
                                    <span className={"element-title"}>Tên nhân viên:
                                        <span style={{color: "red"}}> *</span>
                                    </span>
                                </label>
                                <input type="text" {...register("fullName", {
                                    required: "Tên nhân viên không được để trống!",
                                    maxLength: {value: 50, message : "Tên nhân viên được quá 50 Ký tự!"},
                                    pattern: {value: /^[A-Za-zÀ-ỹà-ỹĂăÂâÊêÔôƠơƯưĐđ\s]+$/, message: "Tên nhân viên không được chứa ký tự số và không được chứa ký tự đặc biệt!"}
                                })}/>
                                {errors.fullName && <p className="validate-error">{errors.fullName.message}</p>}
                                {validateError && <p className="validate-error">{validateError.fullName}</p>}
                            </div>
                            <div className="form-element">
                                <label>
                                    <span className={"element-title"}>Ngày sinh: <span style={{color: "red"}}>*</span></span>
                                </label>
                                <input type="date" {...register("dateOfBirth", {
                                    required: "Ngày sinh không được để trống!",
                                    validate : value => calculateDays(value)
                                })}/>
                                {errors.dateOfBirth && <p className="validate-error">{errors.dateOfBirth.message}</p>}
                                {validateError && <p className="validate-error">{validateError.dateOfBirth}</p>}
                            </div>
                            <div className="form-element">
                                <label>
                                    <span className={"element-title"}>Giới tính:
                                        <span style={{color: "red"}}> *</span>
                                    </span>
                                </label>
                                <div className="form-gender">
                                    {id && employee?.gender === 0 ?
                                        <input type="radio" checked {...register("gender")} value={0}/>
                                        : <input type="radio"{...register("gender", {
                                            required: "Giới tính không được để trống!"
                                        })} value={0}/>
                                    }
                                    <span>Nam</span>
                                    {id && employee?.gender === 1 ?
                                        <input type="radio" checked {...register("gender")} value={1}/>
                                        : <input type="radio"{...register("gender", {
                                            required: "Giới tính không được để trống!"
                                        })} value={1}/>
                                    }
                                    <span>Nữ</span>
                                    {id && employee?.gender === 2 ?
                                        <input type="radio" checked {...register("gender")} value={2}/>
                                        : <input type="radio"{...register("gender", {
                                            required : "Giới tính không được để trống!"
                                        })} value={2}/>
                                    }
                                    <span>Khác</span>
                                </div>
                                {errors.gender && <p className="validate-error">{errors.gender.message}</p>}
                                {validateError && <p className="validate-error">{validateError.gender}</p>}
                            </div>
                            <div className="form-element">
                                <label>
                                    <span className={"element-title"}>Địa chỉ:
                                        <span style={{color: "red"}}> *</span>
                                    </span>
                                </label>
                                <input type="text" {...register("address", {
                                    required : "Địa chỉ không được để trống!"
                                })} />
                                {errors.address && <p className="validate-error">{errors.address.message}</p>}
                                {validateError && <p className="validate-error">{validateError.address}</p>}
                            </div>
                            <div className="form-element">
                                <label>
                                    <span className={"element-title"}>Số điện thoại:
                                        <span style={{color: "red"}}> *</span>
                                    </span>
                                </label>
                                <input type="text" {...register("phoneNumber", {
                                    required : "Số điện thoại không được để trống!",
                                    pattern : {value: /^(?:\+84|0)\d{9}$/, message: "Số điện thoại phải bắt đầu bằng +84 hoặc 0 và kết thúc với 9 số!"}
                                })} />
                                {errors.phoneNumber && <p className="validate-error">{errors.phoneNumber.message}</p>}
                                {validateError && <p className="validate-error">{validateError.phoneNumber}</p>}
                            </div>
                            <div className="form-element">
                                <label>
                                    <span className={"element-title"}>Chức vụ:
                                        <span style={{color: "red"}}> *</span>
                                    </span>
                                </label>
                                <div className="role-list">
                                    {addRoles && addRoles.map((role, index) => (
                                        <div className="role">
                                            <span>
                                                {
                                                    role.roleName === "ROLE_ADMIN" ? "Administrator"
                                                        :
                                                        role.roleName === "ROLE_MANAGER" ? "Quản lý"
                                                            :
                                                            role.roleName === "ROLE_EMPLOYEE" ? "Nhân viên"
                                                                :
                                                                "Khách hàng"
                                                }
                                            </span>
                                            <span className="pop-role" onClick={()=>handlePopRole(JSON.stringify(role))}>X</span>
                                        </div>
                                    ))}
                                </div>
                                <select onChange={(e)=>handleAddRoles(e)}>
                                    <option value="">--Chọn một vị trí--</option>
                                    {roles && roles.map((role) => (
                                        <option key={role.id} value={JSON.stringify(role)}>
                                            {
                                                role.roleName === "ROLE_ADMIN" ? "Administrator"
                                                :
                                                role.roleName === "ROLE_MANAGER" ? "Quản lý"
                                                :
                                                role.roleName === "ROLE_EMPLOYEE" ? "Nhân viên"
                                                :
                                                "Khách hàng"
                                            }
                                        </option>
                                    ))}
                                </select>
                                {rolesError !== null && <p className="validate-error">{rolesError}</p>}
                                {validateError && <p className="validate-error">{validateError.role}</p>}
                            </div>
                        </div>
                        <div className="form-operation">
                            <div className="form-element">
                                <label>
                                    <span className={"element-title"}>Email:
                                        <span style={{color: "red"}}> *</span>
                                    </span>
                                </label>
                                <input type="email" {...register("email", {
                                    required: "Email không được để trống!"
                                })}/>
                                {errors.email && <p className="validate-error">{errors.email.message}</p>}
                                {validateError && <p className="validate-error">{validateError.email}</p>}
                            </div>
                            <div className="new-password form-element">
                                <label>Mật khẩu: <span style={{color: "red"}}>*</span></label>
                                {id === undefined ?
                                    <input type="password" name="password" {...register("password", {
                                        required: "Mật khẩu không được để trống!"
                                    })}
                                    />
                                    : <input type="password" name="password" {...register("password")}
                                    />
                                }
                                {errors.password && <p className="validate-error">{errors.password.message}</p>}
                                {validateError && <p className="validate-error">{validateError.password}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="button-save">
                        <button type="submit" disabled={isLoading}
                                style={isLoading ? {background: "#ccc"} : null}
                                className="btn-submit">
                            {isLoading ? "Đang xử lý..." : (employee ? "Sửa đổi" : "Thêm mới")}
                        </button>
                    </div>
                </form>
            </div>
        }/>
    );
}