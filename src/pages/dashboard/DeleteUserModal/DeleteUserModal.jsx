import styles from "./DeleteUserModal.module.scss";
import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import {toast} from "react-toastify";
import * as userService from "../../../core/services/UserService";

export const DeleteUserModal = ({isOpen, onClose, userDelete, onDeleteSuccess}) => {

    const handleDeleteEmployee = async () => {
        try {
            await userService.deleteUser(userDelete.userId);
            toast.success("Xóa tài khoản thành công");
            onDeleteSuccess(); // Gọi callback để cập nhật danh sách
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
                        <p>Bạn có chắc xóa tài khoản?</p>
                    </div>
                    <div className={styles.employeeCode}>
                        <label>Mã nhân viên: </label>
                        <span>{userDelete.userCode}</span>
                    </div>
                    <div className={styles.employeeName}>
                        <label>Tên nhân viên: </label>
                        <span>{userDelete.fullName}</span>
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.acceptDelete} onClick={handleDeleteEmployee}>Đồng ý</button>
                    <button className={styles.cancel} onClick={onClose}>Huỷ bỏ</button>
                </div>
            </div>
        </div>
    );
};