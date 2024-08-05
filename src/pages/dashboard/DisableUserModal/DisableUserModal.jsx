import styles from "./DisableUserModal.module.scss";
import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import * as userService from "../../../core/services/UserService";
import {toast} from "react-toastify";

export const DisableUserModal = ({isOpen, onClose, userDisable, onDisableSuccess}) => {

    const handleDisableEmployee = async () => {
        try {
            await userService.disableUser(userDisable.userId);
            toast.success("Khóa tài khoản thành công");
            onDisableSuccess(); // Gọi callback để cập nhật danh sách
        } catch (e) {
            toast.error(e);
        }
    }

    return (
        <div className={`${styles.modal} ${isOpen ? styles.open : ''}`}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <IoTrashOutline />
                </div>
                <div className={styles.modalBody}>
                    <div className={styles.modalTitle}>
                        <p>Bạn có chắc muốn khóa tài khoản?</p>
                    </div>
                    <div className={styles.employeeCode}>
                        <label>Mã nhân viên: </label>
                        <span>{userDisable.userCode}</span>
                    </div>
                    <div className={styles.employeeName}>
                        <label>Tên nhân viên: </label>
                        <span>{userDisable.fullName}</span>
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.acceptDelete} onClick={handleDisableEmployee}>Đồng ý</button>
                    <button className={styles.cancel} onClick={onClose}>Huỷ bỏ</button>
                </div>
            </div>
        </div>
    );
};