import {NavBar} from "../../components/navbar/NavBar";
import {Header} from "../../components/header/Header";

import Slideshow from "../../components/slideshow/Slideshow";
import {BestSale} from "../../components/bestSale/BestSale";
import {NewProduct} from "../../components/newProduct/NewProduct";
import FooterHome from "../../components/Footer/FooterHome";

export function HomePage() {

    return(
        <div>
            <Header></Header>
            <NavBar></NavBar>
            <Slideshow></Slideshow>
            <BestSale></BestSale>
            <NewProduct></NewProduct>
            <FooterHome></FooterHome>
        </div>
    );
}