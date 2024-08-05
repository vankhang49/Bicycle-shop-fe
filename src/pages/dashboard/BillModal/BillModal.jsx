import styles from "./BillModal.module.scss";
import React, {useEffect, useState} from "react";
import * as billService from "../../../core/services/BillService";

export function BillModal({isOpen, onClose, billId}) {
    const [bill, setBill] = useState(null);
    const [hasOpened, setHasOpened] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await getBillById(billId);
        };

        if (isOpen && hasOpened) {
            fetchData().then().catch();
        } else if (isOpen) {
            setHasOpened(true);
        }
    }, [isOpen, billId, hasOpened]);

    const getBillById = async (id) => {
        const temp = await billService.getBillById(id);
        setBill(temp);
    }

    const calculateTotalPrice = () => {
        return bill.billItems?.reduce((prev, item) => ((item.quantity * item.pricing.price)*(1 - item.pricing.promotion.discount)) + prev, 0);
    }

    return (
        <div className={`${styles.modal} ${isOpen ? styles.open : ''}`}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>HÓA ĐƠN THANH TOÁN</h2>
                    <p className={styles.logo}>DVKBicycle</p>
                </div>
                {bill &&
                    <div className={styles.textLeft}>
                        <div className={styles.billCode}>
                            <p className={styles.contentTitle}>Mã đơn hàng: </p>
                            <p>{bill.billCode}</p>
                        </div>
                        <div className={styles.dateCreate}>
                            <p className={styles.contentTitle}>Ngày tạo: </p>
                            <p>{(bill.dateCreate)}</p>
                        </div>
                        <div className={styles.customer}>
                            <p className={styles.contentTitle}>Tên khách hàng: </p>
                            <p>{bill.customerName}</p>
                        </div>
                        <div className={styles.email}>
                            <p className={styles.contentTitle}>Địa chỉ email: </p>
                            <p>{bill.email}</p>
                        </div>
                        <div className={styles.phoneNumber}>
                            <p className={styles.contentTitle}>Số điện thoại: </p>
                            <p>{bill.phoneNumber}</p>
                        </div>
                        <div className={styles.address}>
                            <p className={styles.contentTitle}>Địa chỉ: </p>
                            <p>{bill.address}</p>
                        </div>
                        <div className={styles.payment}>
                            <p className={styles.contentTitle}>Hình thức thanh toán: </p>
                            <p>
                                {bill.payment ? "Thanh toán qua ngân hàng" : "Thanh toán trực tiếp bằng tiền mặt"}
                            </p>
                        </div>
                        <table className={styles.table}>
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã sản phẩm</th>
                                <th>Hình ảnh</th>
                                <th>Màu sắc</th>
                                <th>Khuyễn mãi</th>
                                <th>Số lượng</th>
                                <th>Tổng tiền</th>
                            </tr>
                            </thead>
                            <tbody>
                            {bill.billItems?.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.pricing.priceCode}</td>
                                    <td>
                                        <img src={item.pricing.imgColor} alt="imgPrice"/>
                                    </td>
                                    <td>{item.pricing.color.colorName}</td>
                                    <td>{item.pricing.promotion.promotionName}</td>
                                    <td>{item.quantity}</td>
                                    <td>{(item.quantity * item.pricing.price).toLocaleString()} VNĐ</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className={styles.intoMoney}>
                            <div className={styles.total}>
                                <p className={styles.contentTitle}>Tổng tiền: </p>
                                <p className={styles.totalPrice}>{calculateTotalPrice().toLocaleString()} VNĐ</p>
                            </div>
                            <div className={styles.totalPay}>
                                <p className={styles.contentTitle}>Thành tiền: </p>
                                <p className={styles.totalPayPrice}>{calculateTotalPrice().toLocaleString()} VNĐ</p>
                            </div>
                        </div>
                    </div>

                }
                <div className={styles.modalFooter}>
                    <button className={styles.cancel} onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
}