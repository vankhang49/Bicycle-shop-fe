import {Header} from "../header/Header";
import {NavBar} from "../navbar/NavBar";
import FooterHome from "../Footer/FooterHome";
import {useEffect, useState} from "react";
import * as cartService from "../../core/services/CartService";
import {logoutAction} from "../../core/redux/actions/AuthenticationActions";
import {useDispatch} from "react-redux";


export const Main = ({ content }) => {
    const dispatch = useDispatch();
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [countProduct, setCountProduct] = useState(0);

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
        // Kiểm tra ngay khi trang được tải lại
        checkMidnightLogout();

        // Thiết lập kiểm tra mỗi phút
        const interval = setInterval(checkMidnightLogout, 60000); // Kiểm tra mỗi phút

        return () => clearInterval(interval);
    }, []);

    const checkMidnightLogout = () => {
        const now = new Date();
        const lastLoginDate = localStorage.getItem("lastTime");
        if (lastLoginDate) {
            const lastLogin = new Date(lastLoginDate);
            // Chỉ đăng xuất nếu ngày hiện tại khác ngày đăng nhập cuối cùng và đã qua 0 giờ
            if (
                now.getDate() !== lastLogin.getDate() ||
                now.getMonth() !== lastLogin.getMonth() ||
                now.getFullYear() !== lastLogin.getFullYear()
            ) {
                handleLogout();
            }
        }
    };

    const handleLogout = async () => {
        await dispatch(logoutAction());
    };

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