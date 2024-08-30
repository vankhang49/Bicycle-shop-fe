import styles from "./BillModal.module.scss";
import {useEffect, useState} from "react";
import spinner from "../../../assets/icons/Spinner.gif";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import * as billService from "../../../core/services/BillService";
import {clearCart} from "../../../core/redux/actions/CartActions";

export function BillModal({isOpen, onClose, billData}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [bill, setBill] = useState(billData);
    const [waiting, setWaiting] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await setBill(billData);
            try {
                billData.dateCreate = JSON.parse(billData.dateCreate);
                await billService.pay(billData);
                toast.success("Thanh toán thành công!")
                await dispatch(clearCart());
            } catch (error) {
                toast.error(error);
                onClose();
            }
        }
        fetchData();
        setTimeout(async () => {
            setWaiting(false);
        }, 3000);
    }, [billData])

    const calculateTotalPrice = () => {
        return billData.billItems?.reduce((prev, item) => ((item.quantity * item.pricing.price)*(1 - item.pricing.promotion.discount)) + prev, 0);
    }

    const handlePrint = () => {

        // Lấy nội dung của invoice để in
        const invoiceContent = document.getElementById('billContent').innerHTML;

        // Tạo một cửa sổ in mới
        const printWindow = window.open('', '_blank');

        // Đặt nội dung của cửa sổ in là nội dung của invoice
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8" />
                <title>DVKBicyle</title>
                <style>
                    body {
                        font-family: "Arial", sans-serif;
                        width: 100%;
                        height: 100vh;
                        position: relative;
                        display: flex;
                        justify-content: center;
                        align-items: flex-start;
                    }
                    .wrapper {
                        width: 80%;
                    }
                    .BillModal_modalHeader__ob4iG {
                        width: 100%;
                        text-align: center;
                        
                        p {
                            font-size: 1.5rem;
                        }
                    }
                    
                    .BillModal_textLeft__cJET4 {
                        width: 100%;
                        position: relative;
                        height: auto;
                        div {
                            display: flex;
                            justify-content: flex-start;
                            
                            .BillModal_contentTitle__RRv-G {
                                max-width: 200px;
                                min-width: 170px;
                                font-weight: 500;
                            }
                        }
                        
                        .BillModal_table__tEu4z {
                            border-collapse: collapse;
                            font-size: 0.8rem;
                            width: 100%;
                            th, td {
                              padding: 5px;
                              border: 1px solid #000;
                              text-align: center;
                            }
                        }
                        
                        .BillModal_intoMoney__IaE68 {
                            display: block;
                            width: 100%;
                            height: 200px;
                            margin-top: 20px;
                            div {
                              display: flex;
                              justify-content: flex-end;
                              align-items: center;
                              text-align: left;
                    
                              p {
                                text-align: left;
                                max-width: 170px;
                                min-width: 150px;
                              }
                    
                              .BillModal_totalPrice__DAJkp {
                                font-size: 1.1rem;
                              }
                            
                              .BillModal_totalPayPrice__yb9K0 {
                                font-size: 1.2rem;
                              }
                            }
                        }
                    }
                    .BillModal_modalFooter__SFtX3 {
                        display: none;
                    }
                </style>
            </head>
            <body>
                <div class="wrapper">
                    ${invoiceContent}
                </div>
            </body>
            </html>
        `);

        // Đóng việc ghi nội dung
        printWindow.document.close();

        // In cửa sổ in
        printWindow.print();
    };

    const handleBillPerson = async () => {
        navigate("/my-info/bill")
    }

    return (
        <div className={`${styles.modal} ${isOpen ? styles.open : ''}`}>
            <div className={styles.modalContent} id="billContent">
                <div className={styles.modalHeader}>
                    <h2>HÓA ĐƠN THANH TOÁN</h2>
                    <p className={styles.logo}>DVKBicycle</p>
                </div>
                {waiting ?
                    <div className={styles.modalBody}>
                        <div className={styles.delayImg}>
                            <img src={spinner} alt="spinner"/>
                        </div>
                        <h3>Đang xử lý ...</h3>
                        <div className={styles.wait}>Vui lòng đợi trong giây lát</div>
                    </div>
                    :
                    billData &&
                    <div className={styles.textLeft}>
                        <div className={styles.billCode}>
                            <p className={styles.contentTitle}>Mã đơn hàng: </p>
                            <p>{billData.billCode}</p>
                        </div>
                        <div className={styles.dateCreate}>
                            <p className={styles.contentTitle}>Ngày tạo: </p>
                            <p>{(billData.dateCreate)}</p>
                        </div>
                        <div className={styles.customer}>
                            <p className={styles.contentTitle}>Tên khách hàng: </p>
                            <p>{billData.customerName}</p>
                        </div>
                        <div className={styles.email}>
                            <p className={styles.contentTitle}>Địa chỉ email: </p>
                            <p>{billData.email}</p>
                        </div>
                        <div className={styles.phoneNumber}>
                            <p className={styles.contentTitle}>Số điện thoại: </p>
                            <p>{billData.phoneNumber}</p>
                        </div>
                        <div className={styles.address}>
                            <p className={styles.contentTitle}>Địa chỉ: </p>
                            <p>{billData.address}</p>
                        </div>
                        <div className={styles.payment}>
                            <p className={styles.contentTitle}>Hình thức thanh toán: </p>
                            <p>
                                {billData.payment ? "Thanh toán qua ngân hàng" : "Thanh toán trực tiếp bằng tiền mặt"}
                            </p>
                        </div>
                        <table className={styles.table}>
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã sản phẩm</th>
                                <th>Khuyễn mãi</th>
                                <th>Số lượng</th>
                                <th>Tổng tiền</th>
                            </tr>
                            </thead>
                            <tbody>
                            {billData.billItems?.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.pricing.priceCode}</td>
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
                    <button className={styles.acceptDelete} onClick={handleBillPerson}>Xác nhận</button>
                    <button className={styles.printBill} onClick={handlePrint}>In hóa đơn</button>
                    <button className={styles.cancel} onClick={onClose}>Huỷ bỏ</button>
                </div>
            </div>
        </div>
    );
}