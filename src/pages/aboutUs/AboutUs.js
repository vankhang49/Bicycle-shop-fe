import {Why} from "./Why";
import {Store} from "./Store";
import {Main} from "../../components/Main/Main";

export function AboutUs(){

    return(
        <Main content={
            <div className="content">
                <Why></Why>
                <Store></Store>
            </div>
        }/>
    );
}