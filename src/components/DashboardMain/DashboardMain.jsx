import React, {useState} from "react";
import {DashboardNavbar} from "../navbar/DashboardNavbar";
import {DashboardSidebar} from "../sidebars/DashboardSidebar";
import "../../assets/css/style.scss";
import "./DashboardMain.scss";

export function DashboardMain({content}) {
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [closeSidebar, setCloseSidebar] = useState(true);

    const callbackNavbarFunction = (childData) => {
        setIsShowSidebar(childData);
        setCloseSidebar(false);
    };

    const callbackSidebarFunction = (childData) => {
        setIsShowSidebar(childData);
        setCloseSidebar(true);
    }

    return(
        <div id='dashboard-container'>
            <DashboardSidebar OpenSidebar={isShowSidebar} CloseSidebar= {callbackSidebarFunction} />
            {content}
            <DashboardNavbar parentCallback={callbackNavbarFunction} CloseSidebar={closeSidebar} />
        </div>
    );
}