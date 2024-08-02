import styles from "./UpdateBillModal.module.scss";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import spinner from "../../../../assets/icons/Spinner.gif";
import * as billService from "../../../../core/services/BillService";


export function UpdateBillModal({isOpen, onClose, billId}) {

    useEffect(() => {
        console.log(billId)
        setTimeout(async () => {
            try {
                if (billId !== null) {
                    const temp = await billService.updateReceivedBill(billId);
                    toast.success(temp);
                }
                onClose();
            }catch (error) {
                toast.error(error);
                onClose();
            }
        }, 3000);
    }, [billId, isOpen])

    return (
        <div className={`${styles.modal} ${isOpen ? styles.open : ''}`}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>

                </div>
                <div className={styles.modalBody}>
                    <div className={styles.delayImg}>
                        <img src={spinner} alt="spinner"/>
                    </div>
                    <h3>Đang xử lý ...</h3>
                    <div className={styles.wait}>Vui lòng đợi trong giây lát</div>
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.acceptDelete} onClick={onClose}>Xác nhận</button>
                    <button className={styles.cancel} onClick={onClose}>Huỷ bỏ</button>
                </div>
            </div>
        </div>
    );
}