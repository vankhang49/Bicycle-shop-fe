import React, {useEffect, useState} from 'react'
import logo from "../../assets/images/logo-bike.png";
import styles from "./DashboardSidebar.module.scss";
import { MdDashboard } from "react-icons/md";
import { TbUserSquareRounded } from "react-icons/tb";
import { RiFilePaper2Line } from "react-icons/ri";
import { FaChartLine } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { LuListTodo } from "react-icons/lu";
import { PiCloudWarning } from "react-icons/pi";
import { MdOutlineSettings } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { TbLogout } from "react-icons/tb";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import {Link} from "react-router-dom";

export function DashboardSidebar(props) {
    const [sidebarActive, setSidebarActive] = useState(props.OpenSidebar);

    useEffect(() => {
        setSidebarActive(props.OpenSidebar);
    }, [props.OpenSidebar]);

    const handleCloseSidebar = () => {
        setSidebarActive(!sidebarActive);
        props.CloseSidebar(!sidebarActive);
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
                <Link to="/dashboard">
                    <MdDashboard />
                    <h3>Dashboard</h3>
                </Link>
                <Link to="/dashboard/products">
                    <AiOutlineProduct />
                    <h3>Sản phẩm</h3>
                </Link>
                <Link to='/dashboard/customers'>
                    <TbUserSquareRounded />
                    <h3>Khách hàng</h3>
                </Link>
                <Link to="/dashboard/bills">
                    <RiFilePaper2Line />
                    <h3>Đơn hàng</h3>
                </Link>
                <a href="#" className={styles.active}>
                    <FaChartLine />
                    <h3>Analytics</h3>
                </a>
                <a href="#">
                    <IoTicket />
                    <h3>Tickets</h3>
                    <span className={styles.messageCount}>27</span>
                </a>
                <a href="#">
                    <LuListTodo />
                    <h3>Sale List</h3>
                </a>
                <a href="#">
                    <PiCloudWarning />
                    <h3>Reports</h3>
                </a>
                <Link to='/dashboard/setting'>
                    <MdOutlineSettings />
                    <h3>Settings</h3>
                </Link>
                <a href="#">
                    <CiCirclePlus />
                    <h3>New Login</h3>
                </a>
                <a href="#">
                    <TbLogout />
                    <h3>Logout</h3>
                </a>
            </div>
        </aside>
    );
}