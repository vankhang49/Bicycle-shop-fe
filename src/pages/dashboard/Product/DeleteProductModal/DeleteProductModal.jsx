import styles from "./DeleteProductModal.module.scss";
import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import {toast} from "react-toastify";
import * as productService from "../../../../core/services/ProductService";

export const DeleteProductModal = ({isOpen, onClose, productDelete, onDeleteSuccess}) => {

    const handleDeleteProduct = async () => {
        try {
            await productService.deleteProductById(productDelete.productId);
            toast.success("Xóa sản phẩm thành công");
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
                        <p>Bạn có chắc xóa sản phẩm?</p>
                    </div>
                    <div className={styles.employeeCode}>
                        <label>Mã sản phẩm: </label>
                        <span>{productDelete.productCode}</span>
                    </div>
                    <div className={styles.employeeName}>
                        <label>Tên sản phẩm: </label>
                        <span>{productDelete.productName}</span>
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.acceptDelete} onClick={handleDeleteProduct}>Đồng ý</button>
                    <button className={styles.cancel} onClick={onClose}>Huỷ bỏ</button>
                </div>
            </div>
        </div>
    );
};