import React, {useEffect, useState} from 'react'
import logo from "../../assets/images/logo-bike.png";
import styles from "./DashboardSidebar.module.scss";
import { MdDashboard } from "react-icons/md";
import { TbUserSquareRounded } from "react-icons/tb";
import { RiFilePaper2Line } from "react-icons/ri";
import { PiCloudWarning } from "react-icons/pi";
import { MdOutlineSettings } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {logoutAction} from "../../core/redux/actions/AuthenticationActions";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import { RiAdvertisementFill } from "react-icons/ri";
import * as authenticationService from "../../core/services/AuthenticationService";

export function DashboardSidebar(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isEmployee, setIsEmployee] = useState(false);
    const [isManager, setIsManager] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [functionActive, setFunctionActive] = useState("");
    const [sidebarActive, setSidebarActive] = useState(props.OpenSidebar);
    const location = useLocation();
    const path = location.pathname;

    useEffect(() => {
        setSidebarActive(props.OpenSidebar);
    }, [props.OpenSidebar]);

    useEffect(() => {
        const fetchData = async () => {
            await getRoles();
        }
        fetchData();
    }, [props.path]);

    const getRoles = async () => {
        const temp = authenticationService.getRoles();
        (await temp).forEach(role => {
            if (role.roleName === "ROLE_EMPLOYEE") {
                setIsEmployee(true);
            }
            if (role.roleName === "ROLE_ADMIN") {
                setIsAdmin(true);
            }
            if (role.roleName === "ROLE_MANAGER") {
                setIsManager(true);
            }
        })

    }

    const handleCloseSidebar = () => {
        setSidebarActive(!sidebarActive);
        props.CloseSidebar(!sidebarActive);
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
        <aside id={styles.sidebarDashboard} className={sidebarActive? `${styles.appear}` : ""}>
            <div className={styles.toggle}>
                <div className={styles.logo}>
                    <img src={logo} alt="logo"/>
                    <h2>
                        DVK<span className={styles.danger}>Bicycle</span>
                    </h2>
                </div>
                <div className={styles.close} id="close-btn" onClick={handleCloseSidebar}>
                    <IoCloseSharp />
                </div>
            </div>
            <div className={styles.sidebar}>
                <Link className={path === '/dashboard' ? `${styles.active}` : ``}
                      to="/dashboard">
                    <MdDashboard />
                    <h3>Dashboard</h3>
                </Link>
                <Link className={path === '/dashboard/products' ? `${styles.active}` : ``}
                    to="/dashboard/products">
                    <AiOutlineProduct />
                    <h3>Sản phẩm</h3>
                </Link>
                { (isAdmin || isManager) &&
                    <Link className={path === '/dashboard/employees' ? `${styles.active}` : ``}
                        to='/dashboard/employees'>
                        <TbUserSquareRounded />
                        <h3>Nhân viên</h3>
                    </Link>
                }
                <Link className={path === '/dashboard/customers' ? `${styles.active}` : ``}
                    to='/dashboard/customers'>
                    <TbUserSquareRounded />
                    <h3>Khách hàng</h3>
                </Link>
                <Link className={path === '/dashboard/bills' ? `${styles.active}` : ``}
                    to="/dashboard/bills">
                    <RiFilePaper2Line />
                    <h3>Đơn hàng</h3>
                </Link>
                <Link className={path === '/dashboard/advertisements' ? `${styles.active}` : ``}
                      to="/dashboard/advertisements">
                    <RiAdvertisementFill />
                    <h3>Quảng cáo</h3>
                </Link>
                <a href="#" className={path === '/dashboard/reports' ? `${styles.active}` : ``}>
                    <PiCloudWarning />
                    <h3>Reports</h3>
                </a>
                <Link className={path === '/dashboard/setting' ? `${styles.active}` : ``}
                    to='/dashboard/setting'>
                    <MdOutlineSettings />
                    <h3>Settings</h3>
                </Link>
                <Link to='/'>
                    <FaHome />
                    <h3>Trang chủ</h3>
                </Link>
                <a href="#" onClick={handleLogout}>
                    <TbLogout />
                    <h3>Logout</h3>
                </a>
            </div>
        </aside>
    );
}