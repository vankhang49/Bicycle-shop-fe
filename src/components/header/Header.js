import {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import "./header.scss";
import logo from "../../assets/images/logo-bike.png"
import {Link, useNavigate} from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import {TiArrowSortedDown} from "react-icons/ti";
import {FaRegUserCircle} from "react-icons/fa";
import {IoIosLogOut} from "react-icons/io";
import avatar from "./avatar.jpg";
import * as authenticationService from "../../core/services/AuthenticationService";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {fetchCount} from "../../core/redux/actions/CartActions";

export function Header(props){
    const isAuthenticated = !!localStorage.getItem("isAuthenticated");
    const dispatch = useDispatch();
    const countProduct = useSelector(state => state.cart.countProduct);
    const [isShowSidebar, setIsShowSidebar] = useState(props.closeSidebar);
    const [roleName, setRoleName] = useState("");
    const [fullName, setFullName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [isShowUserMenu, setIsShowUserMenu] = useState(false);
    const {register, handleSubmit} = useForm({
        criteriaMode: "all"
    });

    useEffect(() => {
        dispatch(fetchCount()); // Fetch the count of products

        const fetchData = async () => {
            await getRoleName();
            getFullName();
            getAvatar();
        };
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        setIsShowSidebar(props.closeSidebar);
    }, [props.closeSidebar]);

    const navigate = useNavigate();


    const getRoleName = async () => {
        const role = await authenticationService.getRole();
        if (role === 'ROLE_ADMIN') setRoleName("admin");
        if (role === 'ROLE_WAREHOUSE') setRoleName("warehouse");
        if (role === 'ROLE_SALESMAN') setRoleName("salesman");
        if (role === 'ROLE_MANAGER') setRoleName("storeManager");
    };

    const getFullName = () => {
        const fullName = localStorage.getItem('fullName')
        setFullName(fullName);
    }

    const getAvatar = () => {
        const avatar = localStorage.getItem('avatar')
        setAvatarUrl(avatar)
    }

    const onSubmit = (data) => {
        searchProductByName(data.nameSearch);
    }

    const searchProductByName = (productName) => {
        navigate("/Bicycle-shop-fe/products/", {state:{nameSearch: productName}});
    }

    const handleShowSidebar = () => {
        setIsShowSidebar((prevState) => {
            const newState = !prevState;
            props.parentCallback(newState);
            return newState;
        });
    };

    const handleShowUserMenu = () => {
        setIsShowUserMenu(!isShowUserMenu);
    }

    const handleLogout = async () => {
        try {
            const temp = authenticationService.logout();
            toast.success(temp);
            navigate("/Bicycle-shop-fe/login");
            localStorage.clear();
        } catch (e) {
            toast.error(e.message);
        }
    }

    return(
        <div className="head">
            <div className="btn-menu" onClick={handleShowSidebar}>
                <IoMenu/>
            </div>
            <div className="logo">
                <Link to="/Bicycle-shop-fe">
                <img src={logo} alt="logo"/>
                </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="search-bar">
                <input {...register("nameSearch")} type="text" className="searching"
                       placeholder="Search"/>
                <button type="submit" className="btn">Search</button>
            </form>
            <div className="cart">
                <Link to="/Bicycle-shop-fe/cart">
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

                { !isAuthenticated &&
                <Link to="/Bicycle-shop-fe/login">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32
                    32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32
                    32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0
                    45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0
                    45.3s32.8 12.5 45.3 0l128-128z"/>
                    </svg>
                    <span>Đăng nhập</span>
                </Link>}
                {isAuthenticated &&
                    <div className="user-box show-dropdown" onClick={handleShowUserMenu}>
                        <div className="avatar">
                            {avatarUrl ? <img src={avatarUrl} alt="avatar"/> : <img src={avatar} alt="avatar"/>}
                        </div>
                        <div className="username">{fullName}</div>
                        <TiArrowSortedDown/>
                    </div>
                }
                {isAuthenticated &&
                    <div className={isShowUserMenu ? "dropdown-content show" : "dropdown-content"}>
                        <div className="user-full-name">
                            <div className="avatar">
                                {avatarUrl ? <img src={avatarUrl} alt="avatar"/> : <img src={avatar} alt="avatar"/>}
                            </div>
                            {fullName}
                        </div>
                        <Link to={`/Bicycle-shop-fe/dashboard/${roleName}/infor`}>
                            <FaRegUserCircle/>
                            Thông tin cá nhân
                        </Link>
                        <a onClick={handleLogout}>
                            <IoIosLogOut/>
                            Đăng xuất
                        </a>
                    </div>
                }
            </div>
        </div>
    );
}