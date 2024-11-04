import Slideshow from "../../components/slideshow/Slideshow";
import {BestSale} from "../../components/bestSale/BestSale";
import {NewProduct} from "../../components/newProduct/NewProduct";

export default function HomePage() {

    return (
        <div>
            <Slideshow></Slideshow>
            <BestSale></BestSale>
            <NewProduct></NewProduct>
        </div>
    );
}