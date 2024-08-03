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
import {Link, useNavigate} from "react-router-dom";
import {logoutAction} from "../../core/redux/actions/AuthenticationActions";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";

export function DashboardSidebar(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [functionActive, setFunctionActive] = useState("");
    const [sidebarActive, setSidebarActive] = useState(props.OpenSidebar);
    const [path, setPath] = useState(props.path);

    useEffect(() => {
        setSidebarActive(props.OpenSidebar);
    }, [props.OpenSidebar]);

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
                <Link className={path === 'dashboard' ? `${styles.active}` : ``}
                      to="/dashboard">
                    <MdDashboard />
                    <h3>Dashboard</h3>
                </Link>
                <Link className={path === 'products' ? `${styles.active}` : ``}
                    to="/dashboard/products">
                    <AiOutlineProduct />
                    <h3>Sản phẩm</h3>
                </Link>
                <Link className={path === 'employees' ? `${styles.active}` : ``}
                    to='/dashboard/employees'>
                    <TbUserSquareRounded />
                    <h3>Nhân viên</h3>
                </Link>
                <Link className={path === 'customers' ? `${styles.active}` : ``}
                    to='/dashboard/customers'>
                    <TbUserSquareRounded />
                    <h3>Khách hàng</h3>
                </Link>
                <Link className={path === 'bills' ? `${styles.active}` : ``}
                    to="/dashboard/bills">
                    <RiFilePaper2Line />
                    <h3>Đơn hàng</h3>
                </Link>
                <a href="#" className={path === 'reports' ? `${styles.active}` : ``}>
                    <PiCloudWarning />
                    <h3>Reports</h3>
                </a>
                <Link className={path === 'setting' ? `${styles.active}` : ``}
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