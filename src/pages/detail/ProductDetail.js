import bicycle from "../../assets/images/DomaneAL2Disc_23_33083_A_Primary.jpg";
import "./detail.scss"
import {useEffect, useState} from "react";
import * as productService from "../../core/services/ProductService";
import {useLocation, useParams} from "react-router-dom";
import * as pricingService from "../../core/services/PricingService";
import {RelatedProducts} from "../../components/relatedProducts/RelatedProducts";
import {Main} from "../../components/Main/Main";
import {useDispatch} from "react-redux";
import {addToCart, fetchCartFromService, fetchCount} from "../../core/redux/actions/CartActions";
import {toast} from "react-toastify";
import {fCurrency} from "../../utils/format-number";
import {Rating} from "../../components/Rating/Rating";

export function ProductDetail() {
    const [product, setProduct] = useState({});
    const [pricing, setPricing] = useState({});
    const [pricingList, setPricingList] = useState([]);
    const { productId } = useParams();
    const [amount, setAmount] = useState(1);
    const [size, setSize] = useState('');
    const [color, setColor] = useState(null);
    const [imgElement, setImgElement] = useState(null);
    const [selectedButton, setSelectedButton] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            await getProductByProductId(productId);
            await getListPricing(productId);
            dispatch(fetchCartFromService()); // Fetch cart when component mounts
        };
        fetchData();
    }, [productId, dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            const temp = pricingList.find(pricing =>
                pricing.size === size && pricing.color.colorName === color
            );
            await setPricing(temp);
        }
        fetchData();
    }, [color, pricingList, size]);

    const getProductByProductId = async (productId) => {
        const temp = await productService.getProductAndPricingById(productId);
        setProduct(temp);
        setImgElement(temp.productImages[0].imageUrl);
    }

    const getListPricing = async (productId) => {
        const temp = await pricingService.getAllPricingByProductId(productId);
        setPricingList(temp);
    }

    const changeImgUrl = (url) => {
        setImgElement(url);
    }

    const selectButton = (buttonName) => {
        setSelectedButton(buttonName);
    }

    const handleChangeSize = (size) => {
        setSize(size);
    }

    const changeColorAndImgUrl = (url, buttonColorName) => {
        changeImgUrl(url);
        selectButton(buttonColorName);
        setColor(buttonColorName);
    };

    const changeAmount = (symbol) => {
        if (symbol === '-') {
            setAmount(amount - 1);
        } else if (symbol === '+') {
            setAmount(amount + 1);
        }
    }

    const handleAddToCart = async () => {
        if (pricing) {
            await dispatch(addToCart(pricing, amount));
            await dispatch(fetchCartFromService());
            dispatch(fetchCount());
            toast.success("Đã thêm vào giỏ hàng")
        }
    }

    return (
        <Main content={
            <div className="container">
                <div className="content-view">
                    <div className="product-card">
                        <div className="products-top">
                  <span className="product-thumb">
                    <img id="main-img" src={imgElement} alt="image"/>
                  </span>
                            <div className="small-img">
                                {product.productImages && product.productImages.map((image, index) => (
                                    <div className="small-img-col">
                                        <img className="img-element" onMouseOver={() => changeImgUrl(image.imageUrl)}
                                             src={image.imageUrl} alt={image.imageUrl}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="product-info">
                            <div>
                                <label className='name'>
                                    Tên sản phẩm:
                                    <span className="product-name">{product.productName}</span>
                                </label>
                                <label className='code'>
                                    Mã sản phẩm:
                                    <span className="product-code">
                                        {pricing ? pricing.priceCode : product.productCode}
                                    </span>
                                </label>
                                <label className='price-old'>
                                <span className="product-price-old">
                                    { pricing ?
                                        (fCurrency(pricing.price) + " VNĐ")
                                        :
                                        product.pricingList &&
                                        (product.pricingList.length > 1 && (product.pricingList[0].price
                                                !== product.pricingList[product.pricingList.length - 1].price) ?
                                                (fCurrency(product.pricingList[0].price) + " - "
                                                    + fCurrency(product.pricingList[product.pricingList.length - 1].price) + " VNĐ")
                                                : (fCurrency(product.pricingList[0].price) + " VNĐ")
                                        )
                                    }
                                </span>
                                </label>
                                <label className='price-new'>
                                <span className="product-price">
                                    { pricing ?
                                        (fCurrency(Math.round(pricing.price * (1 - pricing.promotion?.discount))) + " VNĐ")
                                        :
                                    product.pricingList &&
                                        (product.pricingList.length > 1 && (product.pricingList[0].price
                                                !== product.pricingList[product.pricingList.length - 1].price) ?
                                                (fCurrency(Math.round(product.pricingList[0].price * (1 - product.pricingList[0].promotion.discount))))
                                                + "-" + (fCurrency(Math.round(product.pricingList[product.pricingList.length - 1].price
                                                    * (1 - product.pricingList[product.pricingList.length - 1].promotion.discount))) + " VNĐ")
                                                : (fCurrency(Math.round(product.pricingList[0].price * (1 - product.pricingList[0].promotion.discount))) + " VNĐ")
                                        )
                                    }
                                </span>
                                </label>
                                {product.pricingList && product.pricingList[0].size ?
                                    ((product.pricingList[0].size !== "" && pricingList[0].size !== null) && (
                                        <div className="select-size">
                                            <label>Chọn kich thước: </label>
                                            {product.pricingList.map((pricing, index) => (
                                                <div className="btn-select" key={index}>
                                                    <button className="btn-color"
                                                            onClick={() => handleChangeSize(pricing.size)}
                                                            onBlur={() => setSelectedButton(null)}
                                                            style={selectedButton === pricing.color.colorName ? {
                                                                border: '1px solid #ff0000',
                                                                color: '#ff0000'
                                                            } : {}}
                                                            type="button">{pricing.size}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ))
                                    : null}
                                <div className="select-color">
                                    <label>Màu sắc:</label>
                                    {product.pricingList && product.pricingList.map((pricing, index) => (
                                        <div className="btn-select" key={index}>
                                            <button className="btn-color"
                                                    onClick={() => changeColorAndImgUrl(pricing.imgColor, pricing.color.colorName)}
                                                    onBlur={() => setSelectedButton(null)}
                                                    style={selectedButton === pricing.color.colorName ? {
                                                        border: '1px solid #ff0000',
                                                        color: '#ff0000'
                                                    } : {}}
                                                    type="button">{pricing.color.colorName}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="btn-ud">
                                    <label>Số lượng: </label>
                                    {amount !== 1 ?
                                        <button id="decrease_button" onClick={() => changeAmount("-")}>-</button>
                                        : <button id="decrease_button" disabled>-</button>}
                                    <input type="text" id="amount" name="amount" value={amount} className="symbol"/>
                                    <button id="increase_button" onClick={() => changeAmount("+")}>+</button>
                                </div>
                                <div className="button-add-cart">
                                    <button className="content-button" type="button" onClick={handleAddToCart}>
                                        THÊM VÀO GIỎ HÀNG
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-description">
                        <div className="title"><h2>Mô tả sản phẩm</h2></div>
                        <div className="description" dangerouslySetInnerHTML={{__html: product?.content}}></div>
                    </div>
                    <Rating productId={productId}/>
                </div>
                <RelatedProducts></RelatedProducts>
            </div>
        }/>
    );
}