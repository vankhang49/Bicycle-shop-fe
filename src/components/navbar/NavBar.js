import {Link} from "react-router-dom";
import "./navBar.scss";
import {useEffect, useRef, useState} from "react";
import * as categoryService from "../../core/services/CategoryService";
import * as productFamilyService from "../../core/services/ProductFamilyService";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../../assets/images/logo-bike.png";
import { IoMdClose } from "react-icons/io";
import * as authenticationService from "../../core/services/AuthenticationService";

export function NavBar(props) {
    const [sidebarActive, setSidebarActive] = useState(props.showSidebar);
    const [categories, setCategories] = useState([]);
    const [productFamilies, setProductFamilies] = useState([]);
    const sidebarRef = useRef(null);
    const [roles, setRoles] = useState([]);
    const [isEmployee, setIsEmployee] = useState(false);
    const [isManager, setIsManager] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await getAllCategories();
            await getAllProductFamilies();
            await isEmp();
            await isManag();
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
        </div>
    );
}