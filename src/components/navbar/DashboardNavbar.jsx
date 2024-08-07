import {TiThMenu} from "react-icons/ti";
import {MdDarkMode, MdLightMode} from "react-icons/md";
import profile1 from "../../pages/dashboard/profile-1.jpg";
import logo from "../../assets/images/logo-bike.png";
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
                            Hi, <b>{fullName}</b>
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
                    <p>Fullstack Web Developer Make By KhangDV</p>
                </div>
            </div>
        </div>
    );
}