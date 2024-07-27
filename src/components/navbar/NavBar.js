import {Link, useNavigation} from "react-router-dom";
import "./navBar.scss";
import {useEffect, useState} from "react";
import * as categoryService from "../../core/services/CategoryService";
import * as productFamilyService from "../../core/services/ProductFamilyService";

export function NavBar() {
    const [categories, setCategories] = useState([]);
    const [productFamilies, setProductFamilies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await getAllCategories();
            await getAllProductFamilies();
        }
        fetchData().then().catch(console.error);
    }, [])

    const getAllCategories = async () => {
        const temp = await categoryService.getAllCategories();
        setCategories(temp);
    }

    const getAllProductFamilies = async () => {
        const temp = await productFamilyService.getAllProductFamilies();
        setProductFamilies(temp);
    }

    return (
        <div className="navbar">
            <ul>
                <li className="dropdown">
                    <Link className={"dropdown-thumb"} to="/">Trang chủ</Link>
                </li>
                {categories && categories.map(category => (
                    <li className="dropdown" key={category.categoryId}>
                        <Link className={"dropdown-thumb"} key={category.categoryId}
                              to={`/products/${category.categoryName}`}>{category.categoryName} &nbsp; ▼</Link>
                        <div className="dropdown-content">
                            {productFamilies && productFamilies.filter((family) =>
                                family.category.categoryId === category.categoryId
                            ).map((family) => (
                                <Link to={`/products/${category.categoryName}/${family.familyName}`}
                                      key={family.familyId}>{family.familyName}</Link>
                            ))}
                        </div>
                    </li>
                ))}
                <li className="dropdown">
                    <Link className={"dropdown-thumb"} to="/products/about-us">Về chúng tôi</Link>
                </li>
            </ul>
        </div>
    );
}