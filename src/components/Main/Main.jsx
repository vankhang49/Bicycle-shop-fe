import {Header} from "../header/Header";
import {NavBar} from "../navbar/NavBar";
import FooterHome from "../Footer/FooterHome";
import {useEffect, useState} from "react";
import * as cartService from "../../core/services/CartService";


export const Main = ({ reRender, content }) => {
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [countProduct, setCountProduct] = useState(0);
    const [cart, setCart] = useState(new Map());

    const callbackFunction = (childData) => {
        setIsShowSidebar(childData);
    };

    useEffect(() => {
        const fetchData = async () => {
            await getCountProduct();
        }
        fetchData().then().catch();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await getCountProduct();
        };
        fetchData().catch();
    }, [reRender]);

    const getCountProduct = async () => {
        const temp = await cartService.getCountProductByProductInCart();
        setCountProduct(temp);
    }

    return(
        <div className="container">
            <Header
                countProduct={countProduct}
                parentCallback={callbackFunction}
                closeSidebar={isShowSidebar}
            ></Header>
            <NavBar showSidebar={isShowSidebar} callBackMain={callbackFunction}></NavBar>
            {content}
            <FooterHome></FooterHome>
        </div>
    );
}