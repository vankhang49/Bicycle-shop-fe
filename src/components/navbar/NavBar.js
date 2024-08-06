import {Link, useNavigate} from "react-router-dom";
import "./navBar.scss";
import {useEffect, useRef, useState} from "react";
import * as categoryService from "../../core/services/CategoryService";
import * as productFamilyService from "../../core/services/ProductFamilyService";
import {IoIosArrowDown, IoIosLogIn, IoIosLogOut} from "react-icons/io";
import logo from "../../assets/images/logo-bike.png";
import { IoMdClose } from "react-icons/io";
import * as authenticationService from "../../core/services/AuthenticationService";
import {useDispatch, useSelector} from "react-redux";
import avatar from "../../assets/images/avatar.jpg";
import {logoutAction} from "../../core/redux/actions/AuthenticationActions";
import {toast} from "react-toastify";

export function NavBar(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [sidebarActive, setSidebarActive] = useState(props.showSidebar);
    const [categories, setCategories] = useState([]);
    const [productFamilies, setProductFamilies] = useState([]);
    const sidebarRef = useRef(null);
    const [roles, setRoles] = useState([]);
    const [fullName, setFullName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [isEmployee, setIsEmployee] = useState(false);
    const [isManager, setIsManager] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await getAllCategories();
            await getAllProductFamilies();
            if (isAuthenticated) {
                await isEmp();
                await isManag();
            }
            getAvatar();
            getFullName();
        }
        fetchData().then().catch(console.error);
    }, [])

    useEffect(() => {
        setSidebarActive(props.showSidebar);
    }, [props.showSidebar]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setSidebarActive(false);
                props.callBackMain(false);
            }
        };

        if (sidebarActive) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [sidebarActive, props]);

    const isEmp = async ()=> {
        const temp = await authenticationService.isEmployee();
        setIsEmployee(temp);
    }

    const isManag = async ()=> {
        const temp = await authenticationService.isStoreManager();
        setIsManager(temp);
    }

    const getAvatar = () => {
        const avatar = localStorage.getItem('avatar')
        setAvatarUrl(avatar)
    }

    const getFullName = () => {
        const fullName = localStorage.getItem('fullName')
        setFullName(fullName);
    }

    const getAllCategories = async () => {
        const temp = await categoryService.getAllCategories();
        setCategories(temp);
    }

    const getAllProductFamilies = async () => {
        const temp = await productFamilyService.getAllProductFamilies();
        setProductFamilies(temp);
    }

    const closeSidebar = () => {
        setSidebarActive(false);
        props.callBackMain(false);
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

    return (
        <div ref={sidebarRef} className={sidebarActive? "navbar appear" : "navbar"}>
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <img src={logo} alt="logo"/>
                </div>
                <div className="close-sidebar" onClick={closeSidebar}>
                    <IoMdClose />
                </div>
            </div>
            {isAuthenticated &&
                <Link to={"/my-info"} className="user-box show-dropdown">
                    <div className="avatar">
                        {avatarUrl ? <img src={avatarUrl} alt="avatar"/> : <img src={avatar} alt="avatar"/>}
                    </div>
                    <div className="username">{fullName}</div>
                </Link>
            }
            <ul>
                <li className="dropdown">
                    <Link className={"dropdown-thumb"} to="/">Trang chủ</Link>
                </li>
                {categories && categories.map(category => (
                    <li className="dropdown" key={category.categoryId}>
                        <Link className={"dropdown-thumb"} key={category.categoryId}
                              to={`/products/${category.categoryName}`}>
                            <span>{category.categoryName}</span>
                            <button><IoIosArrowDown /></button>
                        </Link>
                        <div className="dropdown-content">
                            {productFamilies && productFamilies.filter((family) =>
                                family.category.categoryId === category.categoryId
                            ).map((family) => (
                                <Link to={`/products/${category.categoryName}/${family.familyName}`}
                                      key={family.familyId}>{family.familyName}</Link>
                            ))}
                        </div>
                    </li>
                ))}
                <li className="dropdown">
                    <Link className={"dropdown-thumb"} to="/about-us">Về chúng tôi</Link>
                </li>
                {(isManager || isEmployee) &&
                    <li className="dropdown">
                        <Link className={"dropdown-thumb"} to={"/dashboard"}>Dashboard</Link>
                    </li>
                }
            </ul>
            {isAuthenticated ?
                <a className="logout" onClick={handleLogout}><IoIosLogOut/>Đăng xuất</a>
                :
                <Link to="/login" className="login"><IoIosLogIn />Đăng nhập</Link>
            }
        </div>
    );
}