import {Main} from "../../../components/Main/Main";
import {useEffect, useState} from "react";
import * as billService from "../../../core/services/BillService";
import "./UserBill.scss";

export function UserBill(props) {
    const [bills, setBills] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await getAllBillsByUser();
        }
        fetchData();
    }, []);

    const getAllBillsByUser = async () => {
        const temp = await billService.getAllBillsByUserId();
        setBills(temp);
    }

    const calculateTotalPrice = (billItems) => {
        return billItems.reduce((prev, item) => (item.pricing.price * item.quantity) + prev, 0);
    }


    return(
        <Main content={
            <div id="userBill">
                <div className="bills">
                    {bills.map((item, index) => (
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
                                <div className="received ">
                                    <button type="submit">Đã nhận hàng</button>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        }/>
    );
}