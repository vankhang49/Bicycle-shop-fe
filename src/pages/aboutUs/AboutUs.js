import {Header} from "../../components/header/Header";
import {NavBar} from "../../components/navbar/NavBar";
import FooterHome from "../../components/Footer/FooterHome";
import {Why} from "./Why";
import {Store} from "./Store";

export function AboutUs(){

    return(
        <div>
            <Header></Header>
            <NavBar></NavBar>
            <div className="content">
                <Why></Why>
                <Store></Store>
            </div>
            <FooterHome></FooterHome>
        </div>
    );
}