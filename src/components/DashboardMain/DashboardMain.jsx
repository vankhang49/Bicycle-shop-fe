import React, {useEffect, useState} from "react";
import {DashboardNavbar} from "../navbar/DashboardNavbar";
import {DashboardSidebar} from "../sidebars/DashboardSidebar";
import "../../assets/css/style.scss";
import "./DashboardMain.scss";
import * as authenticationService from "../../core/services/AuthenticationService";
import {Link} from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";

export function DashboardMain({ path ,content}) {
    const [isEmployee, setIsEmployee] = useState(false);
    const [isManager, setIsManager] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [closeSidebar, setCloseSidebar] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await getRoles();
        }
        fetchData();
    }, []);

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

    const callbackNavbarFunction = (childData) => {
        setIsShowSidebar(childData);
        setCloseSidebar(false);
    };

    const callbackSidebarFunction = (childData) => {
        setIsShowSidebar(childData);
        setCloseSidebar(true);
    }

    if (isEmployee || isManager || isAdmin) {
        return(
            <div id='dashboard-container'>
                <DashboardSidebar path = {path} OpenSidebar={isShowSidebar} CloseSidebar= {callbackSidebarFunction} />
                {content}
                <DashboardNavbar parentCallback={callbackNavbarFunction} CloseSidebar={closeSidebar} />
            </div>
        );
    } else {
        return (
            <div id='no-permission'>
                <h1>Bạn không có quyền truy cập vào trang này. Vui lòng rời khỏi đây!</h1>
                <Link to="/">Quay lại trang chủ <RiArrowGoBackFill /></Link>
            </div>
        );
    }
}