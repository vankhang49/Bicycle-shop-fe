import styles from "./BillModal.module.scss";
import {useEffect, useState} from "react";
import spinner from "../../../assets/icons/Spinner.gif";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import * as billService from "../../../core/services/BillService";
import {fetchCartFromServer, fetchCount} from "../../../core/redux/actions/CartActions";

export function BillModal({isOpen, onClose, billData}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(billData)
        setTimeout(async () => {
            try {
                await billService.pay(billData);
                toast.success("Thanh toán thành công!")
                navigate("/my-info/bill")
                dispatch(fetchCartFromServer());
                dispatch(fetchCount());
            }catch (error) {
                toast.error(error);
                onClose();
            }
        }, 3000);
    }, [billData])

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