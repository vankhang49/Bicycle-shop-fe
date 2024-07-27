import {Header} from "../header/Header";
import {NavBar} from "../navbar/NavBar";
import FooterHome from "../Footer/FooterHome";
import {useState} from "react";


export const Main = ({ content }) => {
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [countProduct, setCountProduct] = useState(0);
    const callbackFunction = (childData) => {
        setIsShowSidebar(childData);
    };

    return(
        <div className="container">
            <Header
                parentCallback={callbackFunction}
                closeSidebar={isShowSidebar}
            ></Header>
            <NavBar showSidebar={isShowSidebar} callBackMain={callbackFunction}></NavBar>
            {content}
            <FooterHome></FooterHome>
        </div>
    );
}