import "./Cart.scss";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import * as cartService from "../../core/services/CartService";
import {Main} from "../../components/Main/Main";

export function Cart() {
    const [cart, setCart] = useState([]);
    const [isRenderHeader, setIsRenderHeader] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await getCartFromService();
        }
        fetchData();
    }, [])

    const getCartFromService = async () => {
        const temp = await cartService.getCart();
        setCart(Array.from(temp));
    }

    const handleChangeQuantityForPOP = async (cartItem, quantity) => {
        await cartService.setQuantityForPriceOfProduct(cartItem, quantity);
        await getCartFromService();
    }

    const calculateTotalPrice = () => {
        return cart.reduce((prev, item) => (item[0].price * item[1]) + prev, 0);
    }

    const deleteCartItemFormCart = async (cartItem) => {
        await cartService.deleteFromCart(cartItem);
        await getCartFromService();
        setIsRenderHeader(prev => !prev);
    }

    return (
        <Main reRender={isRenderHeader} content={
                <div className="content-cart">
                    <div className="head-body-content">
                        <h3>Giỏ hàng</h3>
                        <span>Bạn có {cart.size} sản phẩm trong giỏ hàng</span>
                    </div>
                    <div className="carts">
                        {cart.map((item) => (
                            <div className="product-cart">
                                <div className="products-left">
                                <span className="product-thumb">
                                  <img src={item[0].imgColor} alt="image"/>
                                </span>
                                </div>
                                <div className="products-right">
                                    <div className="name">
                                        <a href="#" className="name-product">{item[0].priceName}</a>
                                        <a onClick={()=>deleteCartItemFormCart(item[0])}>X</a>
                                    </div>
                                    { item[0].size !== '' ?
                                    <div className="size">
                                        <select>
                                            <option value="">--Chọn size--</option>
                                            <option value="S">S</option>
                                            <option value="M">M</option>
                                            <option value="L">L</option>
                                        </select>
                                    </div>
                                    : null}
                                    <div className="amount-price">
                                        <div className="btn-ud">
                                            <button id="decrease_button"
                                               onClick={() => handleChangeQuantityForPOP(item[0], --item[1])}>-</button>
                                            <input type="text" className="symbol" value={item[1]}/>
                                            <button id="increase_button"
                                               onClick={() => handleChangeQuantityForPOP(item[0], ++item[1])}>+</button>
                                        </div>
                                        <div className="price">
                                            <span>{item[0].price.toLocaleString()} VNĐ</span>
                                        </div>
                                        <div className="total-price">
                                            <span>{(item[0].price * item[1]).toLocaleString()} VNĐ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="final-total-price">
                            <label>
                                Tổng tiền <span>{calculateTotalPrice().toLocaleString()} VNĐ</span>
                            </label>
                        </div>
                        <div className="button-price">
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3
                                    81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0
                                    19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96
                                    96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7
                                    10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"/>
                                </svg>
                                <Link to={"/products"}>Tiếp tục mua hàng</Link>
                            </button>
                            <button id="pay" className="button-yellow">
                                <Link to={"/pay"}>Thanh toán</Link>
                            </button>
                        </div>
                    </div>
                </div>
        }/>
    );
}