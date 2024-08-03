import styles from "./userDetailModal.module.scss";
import React, {useEffect, useState} from "react";
import avatar from "../../../assets/images/avatar.jpg";
import {toast} from "react-toastify";
import * as userService from "../../../core/services/UserService";

export const UserDetailModal = ({isOpen, onClose, id, onEnableSuccess}) => {
    const [employee, setEmployee] = useState(null);
    const [hasOpened, setHasOpened] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await getUserById(id);
        };

        if (isOpen && hasOpened) {
            fetchData().then().catch();
        } else if (isOpen) {
            setHasOpened(true);
        }
    }, [isOpen, id, hasOpened]);

    const getUserById = async (id) => {
        const temp = await userService.getUserById(id);
        setEmployee(temp);
    }

    const handleEnableEmployee = async () => {
        try {
            await userService.enableUser(id);
            toast.success("Khôi phục tài khoản thành công");
            onEnableSuccess();
        } catch (e) {
            toast.error(e);
        }
    }

    return (
        <div className={`${styles.modal} ${isOpen ? styles.open : ''}`}>
            <div className={styles.modalContent}>
                <div className={styles.backgroundImage} style={{ backgroundImage: `url(${employee?.backgroundImage})` }}></div>
                {employee &&
                    <div className={styles.boxInfo}>
                        <div className={styles.avatar}>
                            {employee.avatar ? <img src={employee.avatar} alt="avatar"/>
                                : <img src={avatar} alt="avatar"/>}
                        </div>
                        <div className={styles.info}>
                            <div className={styles.status}>
                                <label className={styles.title}>Trạng thái: </label>
                                {employee.enabled === true ?
                                    <span>Kích hoạt</span>
                                    : <span style={{color: "red"}}>Bất hoạt</span>
                                }
                            </div>
                            <div className={styles.empCode}>
                                <label className={styles.title}>Mã người dùng: </label>
                                <span>{employee.userCode}</span>
                            </div>
                            <div className={styles.role}>
                                <label className={styles.title}>Chức vụ: </label>
                                {employee.roles.map((role) => (
                                    <span>
                                    {role.roleName === "ROLE_MANAGER" ? "Quản lý"
                                        : role.roleName === "ROLE_EMPLOYEE" ? "Nhân viên"
                                            : role.roleName === "ROLE_CUSTOMER" ? "Khách hàng"
                                                : "Admin"},
                                    </span>
                                ))}
                            </div>
                            <div className={styles.empFullName}>
                                <label className={styles.title}>Họ và tên: </label>
                                <span>{employee.fullName}</span>
                            </div>
                            <div className={styles.gender}>
                                <label className={styles.title}>Giới tính: </label>
                                <span>
                                    {employee.gender === 0 ? "Nam" : employee.gender === 1 ? "Nữ" : "Khác"}
                                </span>
                            </div>
                            <div className={styles.dob}>
                                <label className={styles.title}>Ngày sinh: </label>
                                <span>{employee.dateOfBirth}</span>
                            </div>
                            <div className={styles.address}>
                                <label className={styles.title}>Địa chỉ: </label>
                                <span>{employee.address}</span>
                            </div>
                            <div className={styles.email}>
                                <label className={styles.title}>Địa chỉ email: </label>
                                <span>{employee.email}</span>
                            </div>
                            <div className={styles.phoneNumber}>
                                <label className={styles.title}>Số điện thoại: </label>
                                <span>{employee.phoneNumber}</span>
                            </div>
                        </div>
                        <div className={styles.button}>
                            {employee.enabled === false &&
                                <button onClick={handleEnableEmployee} className={styles.enable}>Khôi phục</button>
                            }
                            <button onClick={onClose}>Đóng</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};