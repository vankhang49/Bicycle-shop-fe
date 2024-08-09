import styles from "./RelatedProducts.module.scss";
import React, {useEffect, useState} from "react";
import * as productsService from "../../core/services/ProductService";
import {fCurrency} from "../../utils/format-number";


export function RelatedProducts(props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await getAllProductRelated();
        }
        fetchData();
    }, []);

    const getAllProductRelated = async () => {
        try {
            const temp = await productsService.getRelatedProducts(props.product?.brand?.category?.categoryName);
            setProducts(temp);
        } catch (e) {
            setProducts([]);
        }

    }

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex < products.length - 1 ? prevIndex + 1 : prevIndex));
    };

    return (
        <div className={styles.content}>
            <div className={styles.contentHeader}>
                <p>Các sản phẩm tương tự</p>
            </div>
            <div className={styles.slideshow}>
                <button onClick={handlePrevClick} style={currentIndex === 0 ? {display: 'none'} : {}}
                        className={styles.prevButton}>{"<"}</button>
                <div className={styles.productContainer}>
                    <ul className={styles.products} style={{transform: `translateX(-${currentIndex * (100 / 5)}%)`}}>
                        {products &&
                            products.filter((item) => item.productId !== props.product.productId
                            ).map((product) => (
                            <li key={product.productId}>
                                <div className={styles.productsTop}>
                                    <a className={styles.productThumb}>
                                        <img src={product.productImages[0].imageUrl} alt={product.productCode}/>
                                    </a>
                                </div>
                                <div className={styles.productInfo}>
                                    <span
                                        className={`${styles.productCode} ${styles.infoElement}`}>{product.productCode}</span>
                                    <a className={`${styles.productName} ${styles.infoElement}`}>{product.productName}</a>
                                    <div>
                                        <span
                                            className={`${styles.productPrice} ${styles.productPriceOld} ${styles.infoElement}`}>
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
                                        <span
                                            className={`${styles.productPrice} ${styles.infoElement}`}>
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
                    </ul>
                </div>
                <button onClick={handleNextClick}
                        style={currentIndex === products.length - 1 ? {display: 'none'} : {}}
                        className={styles.nextButton}>{">"}</button>
            </div>
        </div>
    );
}