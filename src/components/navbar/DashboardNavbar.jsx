import {TiThMenu} from "react-icons/ti";
import {MdDarkMode, MdLightMode, MdModeEdit, MdMoreHoriz} from "react-icons/md";
import profile1 from "../../pages/dashboard/profile-1.jpg";
import logo from "../../assets/images/logo-bike.png";
import {FaRegBell} from "react-icons/fa";
import {FaVolumeHigh} from "react-icons/fa6";
import {CiCirclePlus} from "react-icons/ci";
import React, {useEffect, useState} from "react";
import styles from "./DashboardNavbar.module.scss";
import * as authenticationService from "../../core/services/AuthenticationService";

export function DashboardNavbar(props) {
    const [fullName, setFullName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [isShowSidebar, setIsShowSidebar] = useState(props.CloseSidebar);
    const [roleName, setRoleName] = useState("");

    useEffect(()=> {
        const fetchData = async () => {
            getAvatar();
            getFullName();
            await getRoleName();
        }
        fetchData();
    }, [])

    useEffect(() => {
        setIsShowSidebar(props.CloseSidebar);
    }, [props.CloseSidebar]);

    const getRoleName = async () => {
        const role = await authenticationService.getRoles();
        if (role === 'ROLE_ADMIN') setRoleName("admin");
        if (role === 'ROLE_EMPLOYEE') setRoleName("employee");
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

    const handleChangeDarkMode = () => {
        document.body.classList.toggle('dark-mode-variables');
    }

    const handleShowSidebar = () => {
        setIsShowSidebar(!isShowSidebar);
        props.parentCallback(isShowSidebar);
    }

    return (
        <div id={styles.rightSection}>
            <div className={styles.nav}>
                <button id={styles.menuBtn} onClick={handleShowSidebar}>
                    <TiThMenu/>
                </button>
                <div className={styles.darkMode} onClick={handleChangeDarkMode}>
                    <MdLightMode/>
                    <MdDarkMode/>
                </div>
                <div className={styles.profile}>
                    <div className={styles.info}>
                        <p>
                            Hey, <b>{fullName}</b>
                        </p>
                        <small className={styles.textMuted}>
                            {roleName === "admin" ? "admin"
                                : roleName === "employee" ? "Nhân viên"
                                    : "Quản lý"
                            }
                        </small>
                    </div>
                    <div className={styles.profilePhoto}>
                        {avatarUrl ? (
                                <img src={avatarUrl} alt={'avatar'}/>
                        )
                        :
                            (
                                <img src={profile1} alt={'avatar'}/>
                            )}

                    </div>
                </div>
            </div>
            {/* End of Nav */}
            <div className={styles.userProfile}>
                <div className={styles.logo}>
                    <img src={logo}/>
                    <h2>DVKBicycle</h2>
                    <p>Fullstack Web Developer</p>
                </div>
            </div>
            <div className={styles.reminders}>
                <div className={styles.header}>
                    <h2>Reminders</h2>
                    <FaRegBell/>
                </div>
                <div className={styles.notification}>
                    <div className={styles.icon}>
                        <FaVolumeHigh/>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.info}>
                            <h3>Workshop</h3>
                            <small className={styles.textMuted}>08:00 AM - 12:00 PM</small>
                        </div>
                        <MdMoreHoriz/>
                    </div>
                </div>
                <div className={`${styles.notification} ${styles.deactive}`}>
                    <div className={styles.icon}>
                        <MdModeEdit/>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.info}>
                            <h3>Workshop</h3>
                            <small className={styles.textMuted}>08:00 AM - 12:00 PM</small>
                        </div>
                        <MdMoreHoriz/>
                    </div>
                </div>
                <div className={`${styles.notification} ${styles.addReminder}`}>
                    <div>
                        <CiCirclePlus/>
                        <h3>Add Reminder</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}