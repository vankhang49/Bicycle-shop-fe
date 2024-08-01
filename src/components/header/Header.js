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
import {logoutAction} from "../../core/redux/actions/AuthenticationActions";
import { IoIosLogIn } from "react-icons/io";
import { IoMdCart } from "react-icons/io";

export function Header(props){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);
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

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchCount());
        }
    }, [dispatch, isAuthenticated]);

    const getRoleName = async () => {
        const role = await authenticationService.getRoles();
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
        navigate("/products/", {state:{nameSearch: productName}});
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
            await dispatch(logoutAction());
            toast.success("Đăng xuất thành công!");
            navigate("/login");
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
                <Link to="/">
                <img src={logo} alt="logo"/>
                </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="search-bar">
                <input {...register("nameSearch")} type="text" className="searching"
                       placeholder="Search"/>
                <button type="submit" className="btn">Search</button>
            </form>
            <div className="cart">
                <Link to="/cart">
                    <IoMdCart />
                    <span className="amount-product">{countProduct}</span>
                </Link>
            </div>
            <div className="login">

                { !isAuthenticated &&
                <Link to="/login">
                    <IoIosLogIn />
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
                        <Link to={`/my-info`}>
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