import "./login.scss"
import {useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import FooterHome from "../../components/Footer/FooterHome";
import {useSelector} from "react-redux";
import logo from "../../assets/images/logo-bike.png";

export function LoginMain({content, showRegister}) {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);// Add loading state
    const [isShowRegister, setIsShowRegister] = useState(false);

    useEffect(() => {
        setIsShowRegister(showRegister);
    }, [showRegister]);

    if (isAuthenticated) {
        return <Navigate to="/"/>
    }

    return (
        <div>
            <div className="login-header">
                <div className="left">
                    <div className="logo">
                        <img src={logo} alt="logo"/>
                    </div>
                </div>
                <div className="middle">

                </div>
                <div className="right">
                    <div className="link-back">
                        <Link to='/'>Quay lại trang chủ</Link>
                    </div>
                </div>
            </div>
            <div className="login-page">
                <div className={isShowRegister ? "form-box show-register" : "form-box"}>
                    <div className="content">
                        {content}
                    </div>
                </div>
            </div>
            <FooterHome/>
        </div>

    );
}