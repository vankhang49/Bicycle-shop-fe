import {TiThMenu} from "react-icons/ti";
import {MdDarkMode, MdLightMode, MdModeEdit, MdMoreHoriz} from "react-icons/md";
import profile1 from "../../pages/dashboard/profile-1.jpg";
import logo from "../../assets/images/logo-bike.png";
import {FaRegBell} from "react-icons/fa";
import {FaVolumeHigh} from "react-icons/fa6";
import {CiCirclePlus} from "react-icons/ci";
import React, {useEffect, useState} from "react";
import styles from "./DashboardNavbar.module.scss";

export function DashboardNavbar(props) {
    const [isShowSidebar, setIsShowSidebar] = useState(props.CloseSidebar);

    useEffect(() => {
        setIsShowSidebar(props.CloseSidebar);
    }, [props.CloseSidebar]);

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
                            Hey, <b>Reza</b>
                        </p>
                        <small className={styles.textMuted}>Admin</small>
                    </div>
                    <div className={styles.profilePhoto}>
                        <img src={profile1}/>
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