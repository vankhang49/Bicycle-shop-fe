import {Header} from "../header/Header";
import {NavBar} from "../navbar/NavBar";
import FooterHome from "../Footer/FooterHome";
import {useState} from "react";
import * as cartService from "../../core/services/CartService";


export const Main = ({ content }) => {
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [countProduct, setCountProduct] = useState(0);
    const callbackFunction = (childData) => {
        setIsShowSidebar(childData);
    };

    return(
        <div className="container">
            <Header
                countProduct={cartService.getCountProductByProductInCart()}
                parentCallback={callbackFunction}
                closeSidebar={isShowSidebar}
            ></Header>
            <NavBar showSidebar={isShowSidebar} callBackMain={callbackFunction}></NavBar>
            {content}
            <FooterHome></FooterHome>
        </div>
    );
}