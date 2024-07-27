import React from 'react';
import bikePng from "../../assets/images/bike-png.png";
import styles from "./NewProduct.module.scss";

export function NewProduct() {
    return (
        <div className={styles.content}>
            <div className={styles.contentHeader}>
                <p>New Product</p>
            </div>
            <ul className={styles.products}>
                <li>
                    <div className={styles.productsTop}>
                        <a className={styles.productThumb}>
                            <img src={bikePng} alt="1" />
                        </a>
                        <p className={styles.buyNow}>Mua ngay</p>
                    </div>
                    <div className={styles.productInfo}>
                        <span className={`${styles.productCode} ${styles.infoElement}`}>MB2006</span>
                        <a className={`${styles.productName} ${styles.infoElement}`}>TRIK MOUTAIN BIKE SERI 6</a>
                        <div>
                            <span className={`${styles.productPrice} ${styles.productPriceOld} ${styles.infoElement}`}>25,000,000 VNĐ</span>
                        </div>
                        <div>
                            <span className={`${styles.productPrice} ${styles.infoElement}`}>20,000,000 VNĐ</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div className={styles.productsTop}>
                        <a className={styles.productThumb}>
                            <img src={bikePng} alt="1" />
                        </a>
                        <p className={styles.buyNow}>Mua ngay</p>
                    </div>
                    <div className={styles.productInfo}>
                        <span className={`${styles.productCode} ${styles.infoElement}`}>MB2006</span>
                        <a className={`${styles.productName} ${styles.infoElement}`}>TRIK MOUTAIN BIKE SERI 6</a>
                        <div>
                            <span className={`${styles.productPrice} ${styles.productPriceOld} ${styles.infoElement}`}>25,000,000 VNĐ</span>
                        </div>
                        <div>
                            <span className={`${styles.productPrice} ${styles.infoElement}`}>20,000,000 VNĐ</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div className={styles.productsTop}>
                        <a className={styles.productThumb}>
                            <img src={bikePng} alt="1" />
                        </a>
                        <p className={styles.buyNow}>Mua ngay</p>
                    </div>
                    <div className={styles.productInfo}>
                        <span className={`${styles.productCode} ${styles.infoElement}`}>MB2006</span>
                        <a className={`${styles.productName} ${styles.infoElement}`}>TRIK MOUTAIN BIKE SERI 6</a>
                        <div>
                            <span className={`${styles.productPrice} ${styles.productPriceOld} ${styles.infoElement}`}>25,000,000 VNĐ</span>
                        </div>
                        <div>
                            <span className={`${styles.productPrice} ${styles.infoElement}`}>20,000,000 VNĐ</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div className={styles.productsTop}>
                        <a className={styles.productThumb}>
                            <img src={bikePng} alt="1" />
                        </a>
                        <p className={styles.buyNow}>Mua ngay</p>
                    </div>
                    <div className={styles.productInfo}>
                        <span className={`${styles.productCode} ${styles.infoElement}`}>MB2006</span>
                        <a className={`${styles.productName} ${styles.infoElement}`}>TRIK MOUTAIN BIKE SERI 6</a>
                        <div>
                            <span className={`${styles.productPrice} ${styles.productPriceOld} ${styles.infoElement}`}>25,000,000 VNĐ</span>
                        </div>
                        <div>
                            <span className={`${styles.productPrice} ${styles.infoElement}`}>20,000,000 VNĐ</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div className={styles.productsTop}>
                        <a className={styles.productThumb}>
                            <img src={bikePng} alt="1" />
                        </a>
                        <p className={styles.buyNow}>Mua ngay</p>
                    </div>
                    <div className={styles.productInfo}>
                        <span className={`${styles.productCode} ${styles.infoElement}`}>MB2006</span>
                        <a className={`${styles.productName} ${styles.infoElement}`}>TRIK MOUTAIN BIKE SERI 6</a>
                        <div>
                            <span className={`${styles.productPrice} ${styles.productPriceOld} ${styles.infoElement}`}>25,000,000 VNĐ</span>
                        </div>
                        <div>
                            <span className={`${styles.productPrice} ${styles.infoElement}`}>20,000,000 VNĐ</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}
