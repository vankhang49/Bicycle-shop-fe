import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import "./header.scss";
import logo from "../../assets/images/logo-bike.png"
import {Link, useNavigate} from "react-router-dom";
import * as cartService from "../../core/services/CartService";
import { IoMenu } from "react-icons/io5";

export function Header(props){
    const [countProduct, setCountProduct] = useState(props.countProduct);
    const [isShowSidebar, setIsShowSidebar] = useState(props.closeSidebar);
    const {register, handleSubmit} = useForm({
        criteriaMode: "all"
    });

    useEffect(()=>{
        getCountProductFromService();
    }, []);

    useEffect(()=>{
        getCountProductFromService();
    }, [props.countProduct]);

    useEffect(()=>{
        setIsShowSidebar(props.closeSidebar);
    }, [props.closeSidebar]);

    const getCountProductFromService = () => {
        const temp = cartService.getCountProductByProductInCart();
        setCountProduct(temp);
    }

    const navigate = useNavigate();

    const onSubmit = (data) => {
        searchProductByName(data.nameSearch);
    }

    const searchProductByName = (productName) => {
        navigate("/products/all-products", {state:{nameSearch: productName}});
    }

    const handleShowSidebar = () => {
        setIsShowSidebar((prevState) => {
            const newState = !prevState;
            props.parentCallback(newState);
            return newState;
        });
    };

    return(
        <div className="head">
            <div className="btn-menu" onClick={handleShowSidebar}>
                <IoMenu/>
            </div>
            <div className="logo">
                <img src={logo} alt="logo"/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="search-bar">
                <input {...register("nameSearch")} type="text" className="searching"
                       placeholder="Search"/>
                <button type="submit" className="btn">Search</button>
            </form>
            <div className="cart">
                <Link to="/cart">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6
                     50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6
                     19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4
                     54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0
                     1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                    </svg>
                    <span className="amount-product">{countProduct}</span>
                </Link>
            </div>
            <div className="login">
                <Link to="/login">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32
                    32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32
                    32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0
                    45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0
                    45.3s32.8 12.5 45.3 0l128-128z"/>
                    </svg>
                    <span>Đăng nhập</span>
                </Link>
            </div>
        </div>
    );
}