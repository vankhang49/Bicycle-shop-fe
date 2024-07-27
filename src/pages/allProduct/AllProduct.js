import "../../assets/css/style.scss"
import "../../components/modal/modal.scss"
import {Header} from "../../components/header/Header";
import {NavBar} from "../../components/navbar/NavBar";
import Modal from "../../components/modal/Modal";
import bicycle from "../../assets/images/DomaneAL2Disc_23_33083_A_Primary.jpg";
import {ButtonAddNew} from "../../components/btn-add-new/ButtonAddNew";
import {useEffect, useState} from "react";
import warning from "../../assets/images/warning.png"
// import {useDispatch, useSelector} from "react-redux";
import {getAllBicyclesMiddleware} from "../../core/redux/middleware/ProductMiddleware";
import * as productsService from "../../core/services/ProductService";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import FooterHome from "../../components/Footer/FooterHome";
import {Filter} from "../../components/filter/Filter";

export function AllProduct() {
    // const products = useSelector(state => state.products);
    let { categoryName } = useParams();
    let { familyName } = useParams();
    const [brandName, setBrandName] = useState("");
    const [products,setProducts] = useState([]);
    const [open, setOpen] = useState();
    const navigate = useNavigate();
    const [productDelete, setProductDelete] = useState({
        productCode: "",
        productName: ""
    });
    // const {state} = useLocation();
    // const dispatch = useDispatch();

    useEffect(() => {
        if (categoryName === undefined) categoryName = "";
        if (familyName === undefined) familyName = "";
        const fetchProducts = async () => {
            await getProductsList("", "", familyName, categoryName, brandName);
        }
        fetchProducts().then().catch(console.error);
    }, [categoryName, familyName, brandName]);

    const getProductsList = async (page, nameSearch, familyName, categoryName, brandName) => {
        const temp = await productsService.getAllProducts(page, nameSearch, familyName, categoryName, brandName);
        setProducts(temp.content);
    }

    const showDetailProduct = (productId) => {
        navigate("/products/detail", {state:{id: productId}});
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = (productName, productCode) => {
        setProductDelete({
            productCode : productCode,
            productName : productName
        })
        setOpen(true);
    };

    const updateBrandName = (newBrandName) => {
        setBrandName(newBrandName);
    };

    return (
        <div>
            <div className="wrapper">
                <Header></Header>
                <NavBar></NavBar>
                <div className="content">
                    <ButtonAddNew></ButtonAddNew>
                    <div className="content-body">
                        <Filter categoryName = {categoryName} onBrandNameChange = {updateBrandName}></Filter>
                        <div className="product-list">
                            <ul className="products">
                                {products && products.map((product, index) => (
                                    <li key={index}>
                                        <div className="products-top">
                                            <a onClick={() => showDetailProduct(product.productId)}
                                               className="product-thumb">
                                                <img src={product.productImages[0].imageUrl} alt="1"/>
                                            </a>
                                            <p className="buy-now">Mua ngay</p>
                                        </div>
                                        <div className="product-item">
                                            <div className="delete-item">
                                                <a className="delete-btn button-modal"
                                                   onClick={() => handleOpen(product.productName, product.productCode)}>X</a>
                                            </div>
                                        </div>
                                        <div className="product-info">
                                            <span className="product-code info-element">{product.productCode}</span>
                                            <a onClick={() => showDetailProduct(product.productId)}
                                               className="product-name info-element">{product.productName}</a>
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
                <FooterHome></FooterHome>
            </div>
            <Modal isOpen={open}>
                <div className="head-modal">
                    <img src={warning} alt="warning"/>
                </div>
                <div>
                    <input id="productIdDelete" name="productIdDelete" type="hidden"/>
                    <h2>Bạn có chắc muốn xoá sản phẩm <span id="productName">{productDelete.productName}</span>?</h2>
                    <p>Mã sản phẩm: <span id="productId">{productDelete.productCode}</span></p>
                    <svg className="modal-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                         preserveAspectRatio="none">
                        <rect x="0" y="0" fill="none" width="226" height="162" rx="3" ry="3"></rect>
                    </svg>
                    <div className="modal-footer">
                        <button type="button" className="btn-accept">Accept</button>
                        <button type="button" className="btn-accept btn-cancel" onClick={handleClose}>Cancel</button>
                    </div>
                </div>

            </Modal>
        </div>
    );
}