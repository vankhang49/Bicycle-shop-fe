import "../../assets/css/style.scss"
import "../../components/modal/modal.scss"
import Modal from "../../components/modal/Modal";
import {useEffect, useState} from "react";
import warning from "../../assets/images/warning.png";
import * as productsService from "../../core/services/ProductService";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Filter} from "../../components/filter/Filter";
import {Main} from "../../components/Main/Main";
import { CiFilter } from "react-icons/ci";


export function AllProduct() {
    // const products = useSelector(state => state.products);
    let {categoryName} = useParams();
    const [familyName, setFamilyName] = useState(useParams().familyName || "");
    const [brandName, setBrandName] = useState("");
    const [priceBefore, setPriceBefore] = useState(0);
    const [priceAfter, setPriceAfter] = useState(9999999999);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    // const {state} = useLocation();
    // const dispatch = useDispatch();

    useEffect(() => {
        if (categoryName === undefined) categoryName = "";
        const fetchProducts = async () => {
            await getProductsList("", "", familyName, categoryName, brandName, priceBefore, priceAfter);
        }
        fetchProducts().then().catch(console.error);
    }, [categoryName, familyName, brandName, priceBefore, priceAfter]);

    const getProductsList = async (page, nameSearch, familyName, categoryName, brandName, priceBefore, priceAfter) => {
        const temp = await productsService.getAllProducts(page, nameSearch, familyName, categoryName, brandName, priceBefore, priceAfter);
        setProducts(temp.content);
    }

    const updateBrandName = (newBrandName) => {
        setBrandName(newBrandName);
    };

    const updateFamilyName = (newFamilyName) => {
        setFamilyName(newFamilyName);
    }

    const updatePrice = (newPrice) => {
        switch (newPrice) {
            case "Giá dưới 500.000đ":
                setPriceBefore(0);
                setPriceAfter(500000);
                break;
            case "500.000đ - 5.000.000đ":
                setPriceBefore(500000);
                setPriceAfter(5000000);
                break;
            case "5.000.000đ - 20.000.000đ":
                setPriceBefore(5000000);
                setPriceAfter(20000000);
                break;
            case "Giá trên 20.000.000đ":
                setPriceBefore(20000001);
                setPriceAfter(9999999999);
                break;
            default:
                setPriceBefore(0);
                setPriceAfter(9999999999);
        }
    }

    const handleOpenFilter = () => {
        setIsOpenFilter(true);
    }

    const handleCloseFilter = (childData) => {
        setIsOpenFilter(childData);
    }

    return (
        <Main content={
            <div className="content">
                <div className="button-show-filter">
                    <button onClick={handleOpenFilter}><CiFilter/></button>
                </div>
                <div className="content-body">
                    <Filter
                        categoryName={categoryName}
                        onBrandNameChange={updateBrandName}
                        onFamilyNameChange={updateFamilyName}
                        onPriceChange={updatePrice}
                        isOpenFilter = {isOpenFilter}
                        closeFilter = {handleCloseFilter}
                    >
                    </Filter>
                    <div className="product-list">
                        <ul className="products">
                            {products && products.map((product, index) => (
                                <li key={index}>
                                    <div className="products-top">
                                        <Link to={`/products/detail/${product.productId}`}
                                           className="product-thumb">
                                            <img src={product.productImages[0].imageUrl} alt="1"/>
                                        </Link>
                                        <p className="buy-now">Mua ngay</p>
                                    </div>
                                    <div className="product-info">
                                        <span className="product-code info-element">{product.productCode}</span>
                                        <Link to={`/products/detail/${product.productId}`}
                                           className="product-name info-element">{product.productName}
                                        </Link>
                                        <div>
                                            <span className="product-price product-price-old info-element">
                                                {product.pricingList ?
                                                    (product.pricingList.length > 1 && (product.pricingList[0].price
                                                            !== product.pricingList[product.pricingList.length - 1].price) ?
                                                            (product.pricingList[0].price + " - "
                                                                + product.pricingList[product.pricingList.length - 1].price + " VNĐ")
                                                            : (product.pricingList[0].price + " VNĐ")
                                                    ) : ""}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="product-price info-element">
                                                {product.pricingList ?
                                                    (product.pricingList.length > 1 && (product.pricingList[0].price
                                                            !== product.pricingList[product.pricingList.length - 1].price) ?
                                                            (product.pricingList[0].price + " - "
                                                                + product.pricingList[product.pricingList.length - 1].price + " VNĐ")
                                                            : (product.pricingList[0].price + " VNĐ")
                                                    ) : ""}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        }/>
    );
}