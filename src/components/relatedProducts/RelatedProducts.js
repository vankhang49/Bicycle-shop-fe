import styles from "./RelatedProducts.module.scss";
import bikePng from "../../assets/images/bike-png.png";
import React, {useState} from "react";


export function RelatedProducts(props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const products = [
        { id: 1, code: 'MB2006', name: 'TRIK MOUNTAIN BIKE SERI 6', priceOld: '25,000,000 VNĐ', priceNew: '20,000,000 VNĐ', imgSrc: bikePng },
        { id: 2, code: 'MB2006', name: 'TRIK MOUNTAIN BIKE SERI 6', priceOld: '25,000,000 VNĐ', priceNew: '20,000,000 VNĐ', imgSrc: bikePng },
        { id: 3, code: 'MB2006', name: 'TRIK MOUNTAIN BIKE SERI 6', priceOld: '25,000,000 VNĐ', priceNew: '20,000,000 VNĐ', imgSrc: bikePng },
        { id: 4, code: 'MB2006', name: 'TRIK MOUNTAIN BIKE SERI 6', priceOld: '25,000,000 VNĐ', priceNew: '20,000,000 VNĐ', imgSrc: bikePng },
        { id: 5, code: 'MB2006', name: 'TRIK MOUNTAIN BIKE SERI 6', priceOld: '25,000,000 VNĐ', priceNew: '20,000,000 VNĐ', imgSrc: bikePng }
    ];

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
                <button onClick={handlePrevClick} style={currentIndex === 0 ? {display: 'none'}: {}}
                        className={styles.prevButton}>{"<"}</button>
                <div className={styles.productContainer}>
                    <ul className={styles.products} style={{ transform: `translateX(-${currentIndex * (100 / 5)}%)` }}>
                        {products.map((product) => (
                            <li key={product.id}>
                                <div className={styles.productsTop}>
                                    <a className={styles.productThumb}>
                                        <img src={product.imgSrc} alt={product.name} />
                                    </a>
                                </div>
                                <div className={styles.productInfo}>
                                    <span className={`${styles.productCode} ${styles.infoElement}`}>{product.code}</span>
                                    <a className={`${styles.productName} ${styles.infoElement}`}>{product.name}</a>
                                    <div>
                                        <span className={`${styles.productPrice} ${styles.productPriceOld} ${styles.infoElement}`}>{product.priceOld}</span>
                                    </div>
                                    <div>
                                        <span className={`${styles.productPrice} ${styles.infoElement}`}>{product.priceNew}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <button onClick={handleNextClick} style={currentIndex === products.length - 1 ? {display: 'none'}: {}}
                        className={styles.nextButton}>{">"}</button>
            </div>
        </div>
    );
}