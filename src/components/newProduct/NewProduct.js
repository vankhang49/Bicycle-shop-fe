import React, {useEffect, useState} from 'react';
import styles from "./NewProduct.module.scss";
import * as ProductService from "../../core/services/ProductService";
import {Link} from "react-router-dom";
import {fCurrency} from "../../utils/format-number";

export function NewProduct() {
    const [newProducts, setNewProducts] = React.useState([]);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            await getNewProducts();
        }
        fetchData();
    }, [])

    const getNewProducts = async () => {
        try {
            const temp = await ProductService.getNewProducts();
            setNewProducts(temp);
        } catch (e) {
            setMessage(e);
        }
    }

    return (
        <div className={styles.content}>
            <div className={styles.contentHeader}>
                <p>New Product</p>
            </div>
            <ul className={styles.products}>
                {newProducts && newProducts.map((item, index) => (
                        <li key={item.productId}>
                            <div className={styles.productsTop}>
                                <a className={styles.productThumb}>
                                    <img src={item.productImages[0].imageUrl} alt="1"/>
                                </a>
                                <Link to={`/products/detail/${item.productId}`} className={styles.buyNow}>Mua ngay</Link>
                            </div>
                            <div className={styles.productInfo}>
                                <span className={`${styles.productCode} ${styles.infoElement}`}>{item.productCode}</span>
                                <Link to={`/products/detail/${item.productId}`}
                                      className={`${styles.productName} ${styles.infoElement}`}>
                                    {item.productName}
                                </Link>
                                <div>
                                    <span
                                        className={`${styles.productPrice} ${styles.productPriceOld} ${styles.infoElement}`}>
                                        {item.pricingList ?
                                            (item.pricingList.length > 1 && (item.pricingList[0].price
                                                    !== item.pricingList[item.pricingList.length - 1].price) ?
                                                    (fCurrency(item.pricingList[0].price) + " - "
                                                        + fCurrency(item.pricingList[item.pricingList.length - 1].price) + " VNĐ")
                                                    : (fCurrency(item.pricingList[0].price) + " VNĐ")
                                            ) : ""}
                                    </span>
                                </div>
                                <div>
                                    <span
                                        className={`${styles.productPrice} ${styles.infoElement}`}>
                                        {item.pricingList ?
                                            (item.pricingList.length > 1 && (item.pricingList[0].price
                                                    !== item.pricingList[item.pricingList.length - 1].price) ?
                                                    (fCurrency(Math.round((item.pricingList[0].price * (1 - item.pricingList[0].promotion.discount)))) + " - "
                                                        + (fCurrency(Math.round(item.pricingList[item.pricingList.length - 1].price * (1 - item.pricingList[item.pricingList.length - 1].promotion.discount)))) + " VNĐ")
                                                    : (fCurrency(Math.round((item.pricingList[0].price * (1 - item.pricingList[0].promotion.discount)))) + " VNĐ")
                                            ) : ""}
                                    </span>
                                </div>
                            </div>
                        </li>
                ))}
            </ul>
        </div>
    );
}
