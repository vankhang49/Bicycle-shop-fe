import {useEffect, useState} from "react";
import * as billService from "../../../core/services/BillService";
import "./UserBill.scss";
import {UpdateBillModal} from "./UpdateBillModal/UpdateBillModal";
import {toast} from "react-toastify";
import {RatingModal} from "../RatingModal/RatingModal";

export function UserBill(props) {
    const [bills, setBills] = useState([]);
    const [billId, setBillId] = useState(null);
    const [bill, setBill] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenRatingModal, setIsOpenRatingModal] = useState(false);
    const [totalPages, setTotalPages] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            await getAllBillsByUser(pageNumber);
        }
        fetchData();
    }, [pageNumber]);

    const getAllBillsByUser = async (page) => {
        try {
            const temp = await billService.getAllBillsByUserId(page);
            setBills(temp.content);
        } catch (error) {
            toast.error("Bạn đã đến trang cuối");
        }

    }

    const calculateTotalPrice = (billItems) => {
        return billItems.reduce((prev, item) => (item.pricing.price * item.quantity) + prev, 0);
    }

    const handleOpenModal = (bill) => {
        setIsOpenModal(true);
        setBillId(bill.id);
        setBill(bill);
    }

    const handleOpenRatingModal = () => {
        setIsOpenRatingModal(true);
    }

    const handleCloseModal = async () => {
        setIsOpenModal(false);
        if ( billId !== null) {
            await getAllBillsByUser(pageNumber);
            setBillId(null);
            handleOpenRatingModal(bill);
        }
    }

    const handleCloseRatingModal = () => {
        setIsOpenRatingModal(false);
    }

    const handleLoadMore = async () => {
        setPageNumber(pageNumber + 1);
    }

    return(
        <div id="userBill">
                <div className="bills">
                    {bills && bills.map((item, index) => (
                        <div className="bill" key={item.id}>
                            <div className="No">
                                <p>No</p>
                                <p>{index + 1}</p>
                            </div>
                            {item.billItems.map((billItem) => (
                            <div className="product-cart cart-oder" key={billItem.id}>
                                <div className="products-left left-oder">
                                    <span className="product-thumb">
                                        <img src={billItem.pricing.imgColor} alt="image"/>
                                    </span>
                                </div>
                                <div className="products-right right-oder">
                                    <div className="name">
                                        <span className="name-product">{billItem.pricing.priceName}</span>
                                    </div>
                                    {billItem.pricing.size &&
                                        <div className="size">
                                            <span>Kích cỡ: XL</span>
                                        </div>
                                    }
                                    <div className="amount-price">
                                        <div className="btn-ud">
                                            <span>Số lượng: {billItem.quantity}</span>
                                        </div>
                                        <div className="price">
                                            <span>{billItem.pricing.price.toLocaleString()} VNĐ</span>
                                        </div>
                                        <div className="total-price">
                                            <span>{(billItem.pricing.price * billItem.quantity).toLocaleString()} VNĐ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                            <div className="total">
                                <div className="total-cost">
                                    <span>Tạm tính:</span>
                                    <span
                                        className={"price-span"}>{calculateTotalPrice(item.billItems).toLocaleString()} VNĐ</span>
                                </div>
                                <div className="final-cost">
                                    <span>Tổng cộng:</span>
                                    <span
                                        className='final-price'>{calculateTotalPrice(item.billItems).toLocaleString()} VNĐ</span>
                                </div>
                                {item.paid === false &&
                                <div className="received ">
                                    <button type="submit" onClick={()=> handleOpenModal(item)}>Đã nhận hàng</button>
                                </div>
                                }
                            </div>
                        </div>
                    ))}
                    { bills.length === 10 &&
                    <div className="button-load-more">
                        <button onClick={handleLoadMore}>Xem thêm</button>
                    </div>
                    }

                </div>
                <UpdateBillModal
                    isOpen={isOpenModal}
                    onClose={handleCloseModal}
                    billId={billId}
                />
                <RatingModal
                    isOpen={isOpenRatingModal}
                    onClose={handleCloseRatingModal}
                    bill = {bill}
                />
            </div>
    );
}