import Slideshow from "../../components/slideshow/Slideshow";
import {BestSale} from "../../components/bestSale/BestSale";
import {NewProduct} from "../../components/newProduct/NewProduct";
import FooterHome from "../../components/Footer/FooterHome";
import {Main} from "../../components/Main/Main";

export function HomePage() {

    return(
        <Main content={
            <div>
                <Slideshow></Slideshow>
                <BestSale></BestSale>
                <NewProduct></NewProduct>
                <FooterHome></FooterHome>
            </div>
        }/>
    );
}