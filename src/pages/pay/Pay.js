import "./pay.scss"
import {useEffect, useState} from "react";
import * as cartService from "../../core/services/CartService";
import * as billService from "../../core/services/BillService";
import {useForm} from "react-hook-form";
import {Main} from "../../components/Main/Main";

export function Pay() {
    const [cart, setCart] = useState([]);
    const {register, handleSubmit, formState: {errors}} = useForm({
        criteriaMode: "all"
    });

    useEffect(() => {
        getCartFromService();
    }, [])

    const getCartFromService = () => {
        const temp = cartService.getCart();
        setCart(Array.from(temp));
    }

    const calculateTotalPrice = () => {
        return cart.reduce((prev, item) => (item[0].price * item[1]) + prev, 0);
    }

    const onSubmit = async (data) => {
        try {
            data.billItems = changeToBillItem();
            console.log(data)
            await billService.pay(data);
        } catch (error) {
            console.log(error)
        }
        console.log("Thêm mới thành công!");
    }

    const changeToBillItem = () => {
        return cart.map((item) => (
            {
                pricing: item[0],
                quantity: item[1]
            }
        ));
    }

    return (
        <Main content={
            <div className="content">
                <form onSubmit={handleSubmit(onSubmit)} className="form-oder">
                    <div className="form-left">
                        <h3>THÔNG TIN GIAO HÀNG</h3>
                        <div className="element">
                            <input type="text" placeholder="Họ và tên (*)" id="customerName"
                                   {...register("customerName", {
                                       required: "Không được để trống!",
                                       pattern: {
                                           value: /^[A-ZĐđÀ][A-Za-zĐđÀ-ỹ0-9 '"/]{4,50}$/,
                                           message: "Tên phải bắt đầu bằng chữ IN HOA và có thể chứa khoảng trắng và các ký tự đặc biệt!"
                                       }
                                   })}/>
                            {errors.customerName && <p style={{color: "red", fontSize: "16px"}}>{errors.customerName.message}</p>}
                        </div>
                        <div className="element">
                            <input type="text" placeholder="Email" id="email"
                                   {...register("email", {
                                       required: "Không được để trống!",
                                       pattern: {
                                           value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                           message: "Email phải đúng cú pháp!!! Vd: abc123@email.com"
                                       }
                                   })}/>
                            {errors.email && <p style={{color: "red", fontSize: "16px"}}>{errors.email.message}</p>}
                        </div>
                        <div className="element">
                            <input type="text" placeholder="Số điện thoại (*)" id="phoneNumber"
                                   {...register("phoneNumber", {
                                       required: "Không được để trống!",
                                       pattern: {
                                           value: /^(0|\+84)[1-9]{1}[0-9]{8,9}$/,
                                           message: "Số điện thoại phải bắt đầu bằng 0 hoặc +84 và kết thúc với 9 chữ số!"
                                       }
                                   })}/>
                            {errors.phoneNumber && <p style={{color: "red", fontSize: "16px"}}>{errors.phoneNumber.message}</p>}
                        </div>
                        <div className="element">
                            <input type="text" placeholder="Địa chỉ (*)" id="address"
                                   {...register("address", {required: "Không được để trống!"})}/>
                            {errors.address && <p style={{color: "red", fontSize: "16px"}}>{errors.address.message}</p>}
                        </div>
                        <h3>HÌNH THỨC THANH TOÁN</h3>
                        <div className="payment-methods">
                            <div className="radio-element">
                                <input type="radio" id="radio1" checked value={false} name="payment" className="radio"
                                       {...register("payment")}/>
                                <label htmlFor="radio1">Thanh toán khi nhận hàng</label>
                            </div>
                            <div className="radio-element">
                                <input type="radio" id="radio2" value={true} name="payment" className="radio"
                                       {...register("payment")}/>
                                <label htmlFor="radio2">Chuyển khoản qua ngân hàng</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-right">
                        <div className="carts">
                            {cart.map((item) => (
                                <div className="product-cart cart-oder" key={item[0].priceId}>
                                    <div className="products-left left-oder">
                                    <span className="product-thumb">
                                        <img src={item[0].imgColor} alt="image"/>
                                    </span>
                                    </div>
                                    <div className="products-right right-oder">
                                        <div className="name">
                                            <span className="name-product">{item[0].priceName}</span>
                                        </div>
                                        {item[0].size &&
                                            <div className="size">
                                                <span>Kích cỡ: XL</span>
                                            </div>
                                        }
                                        <div className="amount-price">
                                            <div className="btn-ud">
                                                <span>Số lượng: {item[1]}</span>
                                            </div>
                                            <div className="total-price">
                                                <span>{(item[0].price*item[1]).toLocaleString()} VNĐ</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="total-cost">
                                <span>Tạm tính:</span>
                                <span className={"price-span"}>{calculateTotalPrice().toLocaleString()} VNĐ</span>
                            </div>
                            <div className="final-cost">
                                <span>Tổng cộng:</span>
                                <span className='final-price'>{calculateTotalPrice().toLocaleString()} VNĐ</span>
                            </div>
                            <div className="pay">
                                <button type="submit">Thanh toán</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        }/>
    );
}