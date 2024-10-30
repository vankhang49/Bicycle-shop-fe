import "../../assets/css/style.scss"
import "../../components/modals/modal.scss"
import {useEffect, useState} from "react";
import * as productsService from "../../core/services/ProductService";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {Filter} from "../../components/filter/Filter";
import {CiFilter} from "react-icons/ci";
import {fCurrency} from "../../utils/format-number";
import Loading from "../../components/Loading/Loading";
import spinner from "../../assets/icons/Spinner.gif";

export function AllProduct() {
    // const products = useSelector(state => state.products);
    const { categoryName: paramCategoryName, familyName: paramFamilyName } = useParams();
    const [categoryName, setCategoryName] = useState(paramCategoryName || '');
    const [familyName, setFamilyName] = useState(paramFamilyName || '');
    const [brandName, setBrandName] = useState("");
    const [nameSearch, setNameSearch] = useState("");
    const [priceFilter, setPriceFilter] = useState("");
    const [priceBefore, setPriceBefore] = useState(0);
    const [priceAfter, setPriceAfter] = useState(9999999999);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [hoveredProductIndex, setHoveredProductIndex] = useState(null);
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [delay, setDelay] = useState(false);
    const [message, setMessage] = useState(null);

    const {state} = useLocation();
    // const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            setDelay(false);
        }, 3000)
    }, [isLoading === false])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                setDelay(true);
                await getProductsList(pageNumber, nameSearch, familyName, categoryName, brandName, priceBefore, priceAfter);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();

        // Cleanup function to prevent setting state after unmount
        return () => {
            setIsLoading(false);
            setDelay(false);
        };
    }, [pageNumber, nameSearch, familyName, categoryName, brandName, priceBefore, priceAfter]);

    useEffect(() => {
        setCategoryName(paramCategoryName || '');
        setFamilyName(paramFamilyName || '');
    }, [paramCategoryName, paramFamilyName]);

    useEffect(() => {
        if (state !== null) {
            setNameSearch(state.productName);
        }
    }, [state]);

    const getProductsList = async (page, nameSearch, familyName, categoryName, brandName, priceBefore, priceAfter) => {
        try {
            const temp = await productsService.getAllProducts(page, nameSearch, familyName, categoryName, brandName, priceBefore, priceAfter);
            setProducts(temp.content);
            setTotalPages(temp.totalPages)
            setMessage(null);
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        } catch (e) {
            setProducts([]);
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
            setMessage(e);
        }

    }

    const updateBrandName = (newBrandName) => {
        setBrandName(newBrandName);
    };

    const updateFamilyName = (newFamilyName) => {
        setFamilyName(newFamilyName);
    }

    const updatePrice = (newPrice) => {
        setPriceFilter(newPrice);
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

    const handleMouseEnter = (index) => {
        setHoveredProductIndex(index);
    }

    const handleMouseLeave = () => {
        setHoveredProductIndex(null);
    }

    const showPageNo = () => {
        let pageNoTags = [];
        for (let i = 0; i < totalPages; i++) {
            pageNoTags.push(<a key={i} className="page-a" onClick={() => handlePage(i)}>{i + 1}</a>);
        }
        return pageNoTags;
    }

    const handlePage = (pageNo) => {
        setPageNumber(pageNo);
    }

    return (
        <div className="content">
            <div className="button-show-filter">
                <button onClick={handleOpenFilter}><CiFilter/></button>
            </div>
            <div className="content-body">
                <Filter
                    categoryName={categoryName}
                    familyName={familyName}
                    brandName={brandName}
                    priceFilter={priceFilter}
                    onBrandNameChange={updateBrandName}
                    onFamilyNameChange={updateFamilyName}
                    onPriceChange={updatePrice}
                    isOpenFilter={isOpenFilter}
                    closeFilter={handleCloseFilter}
                >
                </Filter>
                {isLoading ? (
                    <div className="loading">
                        <Loading/>
                    </div>
                ) : (
                    <div className="product-list">
                        <ul className="products">
                            {products && products.map((product, index) => (
                                <li key={index} onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}>
                                    <div className="products-top">
                                        <Link to={`/products/detail/${product.productId}`}
                                              className={`product-thumb ${hoveredProductIndex === index ? 'hover' : ''}`}>
                                            {delay ? <img src={spinner} alt="spinner"/>
                                                :
                                                hoveredProductIndex === index ? (
                                                    product.productImages.map((image, idx) => (
                                                        <img key={idx} src={image.imageUrl}
                                                             alt={`product-image-${idx}`}/>
                                                    ))
                                                ) : (
                                                    <img src={product.productImages[0].imageUrl} alt="1"
                                                         onLoad={() => setIsLoading(false)}/>
                                                )
                                            }
                                        </Link>
                                        {product.pricingList[0].promotion.discount > 0 &&
                                            <span
                                                className="promotion">{product.pricingList[0].promotion.promotionName}</span>
                                        }
                                        <p className="buy-now">Mua ngay</p>
                                        {index < 5 &&
                                            <span className='label-new'></span>
                                        }

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
                                                            (fCurrency(product.pricingList[0].price) + " - "
                                                                + fCurrency(product.pricingList[product.pricingList.length - 1].price) + " VNĐ")
                                                            : (fCurrency(product.pricingList[0].price) + " VNĐ")
                                                    ) : ""}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="product-price info-element">
                                                {product.pricingList ?
                                                    (product.pricingList.length > 1 && (product.pricingList[0].price
                                                            !== product.pricingList[product.pricingList.length - 1].price) ?
                                                            (fCurrency(Math.round((product.pricingList[0].price * (1 - product.pricingList[0].promotion.discount)))) + " - "
                                                                + (fCurrency(Math.round(product.pricingList[product.pricingList.length - 1].price * (1 - product.pricingList[product.pricingList.length - 1].promotion.discount)))) + " VNĐ")
                                                            : (fCurrency(Math.round((product.pricingList[0].price * (1 - product.pricingList[0].promotion.discount)))) + " VNĐ")
                                                    ) : ""}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {message !== null && <p className="message">{message}</p>}
                        </ul>
                        {message === null &&
                        <div className="page">
                            <div className="page-box">
                                {pageNumber !== 0 &&
                                    <a className="page-a" onClick={() => handlePage(pageNumber - 1)}>Trang trước</a>
                                }
                                <span>
                                    {showPageNo()}
                                </span>
                                {pageNumber < (totalPages - 1) &&
                                    <a className="page-a" onClick={() => handlePage(pageNumber + 1)}>Trang sau</a>
                                }
                            </div>
                        </div>
                        }
                    </div>
                )}
            </div>
        </div>
    );
}