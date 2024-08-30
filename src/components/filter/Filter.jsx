import React, {useEffect, useState} from 'react';
import styles from './Filter.module.scss'; // Import CSS module
import { IoIosArrowForward } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import * as productFamilyService from "../../core/services/ProductFamilyService";
import {Link} from "react-router-dom";
import {getAllBrandByCategoryName} from "../../core/services/BrandService";
import * as brandService from "../../core/services/BrandService";
import {IoCloseSharp} from "react-icons/io5";

export function Filter(props) {
    const [productFamilies, setProductFamilies] = useState([]);
    const [brands, setBrands] = useState([]);
    const categoryName = props.categoryName;
    const [familyName, setFamilyName] = useState(props.familyName || '');
    const [brandName, setBrandName] = useState(props.brandName || "");
    const [priceFilter, setPriceFilter] = useState(props.priceFilter || "");
    const [isOpenFilter, setIsOpenFilter] = useState(props.isOpenFilter);

    useEffect(() => {
        const fetchData = async () => {
            await getAllProductFamilies();
            await getAllBrandsByCategoryName(categoryName);
        }
        fetchData().then().catch(console.error);
    }, [categoryName])

    useEffect(() => {
        setIsOpenFilter(props.isOpenFilter);
    }, [props.isOpenFilter])

    const getAllProductFamilies = async () => {
        const temp = await productFamilyService.getAllProductFamilies();
        setProductFamilies(temp);
    }

    const getAllBrandsByCategoryName = async (categoryName) => {
        const temp = await brandService.getAllBrandByCategoryName(categoryName);
        setBrands(temp);
    }

    const handleCancelFilter = () => {
        setBrandName("");
        setFamilyName("");
        setPriceFilter("");
        props.onBrandNameChange('');
        props.onFamilyNameChange('');
        props.onPriceChange('');
    }

    const handleChangeFamily = (family) => {
        setFamilyName(family);
    }

    const handleRemoveBrand = () => {
        setBrandName("");
        props.onBrandNameChange('');
    }
    const handleRemoveFamily = () => {
        setFamilyName("");
        props.onFamilyNameChange('');
    }

    const handleRemovePrice = () => {
        setPriceFilter("");
        props.onPriceChange('');
    }

    const handleSearchByBrand = () => {props.onBrandNameChange(brandName);}
    const handleSearchByFamily = () => {props.onFamilyNameChange(familyName);}

    const handleSearchByFilter = ()  => {
        props.onBrandNameChange(brandName);
        props.onFamilyNameChange(familyName);
        props.onPriceChange(priceFilter);
    }

    const handleCloseFilter = () => {
        setIsOpenFilter(false);
        props.closeFilter(false);
    }

    return (
        <aside className={isOpenFilter ? `${styles.sidebar} ${styles.active}` : `${styles.sidebar}`}>
            <div className={styles.asideFilter}>
                <div className={styles.heading}>
                    <div className={styles.titleHead}>
                        <h2>Bộ lọc</h2>
                        <button className={styles.close} id="close-btn" onClick={handleCloseFilter}>
                            <IoCloseSharp/>
                        </button>
                    </div>
                    <p>Giúp lọc nhanh sản phẩm bạn tìm kiếm</p>
                </div>
                <div className={styles.asideHiddenMobile}>
                    <div className={styles.filterContainer}>
                        <div className={styles.filterContainers}>
                            <div className={styles.filterContainerSelectedFilter}>
                                <div className={`${styles.filterContainerSelectedFilterHeader} ${styles.clearfix}`}>
                                    <span className={styles.selectedFilterHeaderTitle}>Bạn chọn</span>
                                    <a className={styles.clearAll} onClick={handleCancelFilter}>
                                        Bỏ hết <IoIosArrowForward />
                                    </a>
                                </div>
                                <div className={styles.selectedFilterList}>
                                    <ul>
                                        {brandName &&
                                            <li className={styles.selectedFilterItem}>
                                                {brandName}
                                                <div className={styles.buttonCancel} onClick={handleRemoveBrand}>x</div>
                                            </li>
                                        }
                                        {familyName &&
                                            <li className={styles.selectedFilterItem}>
                                                {familyName}
                                                <div className={styles.buttonCancel} onClick={handleRemoveFamily}>x</div>
                                            </li>
                                        }
                                        {priceFilter &&
                                            <li className={styles.selectedFilterItem}>
                                                {priceFilter}
                                                <div className={styles.buttonCancel} onClick={handleRemovePrice}>x</div>
                                            </li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <aside className={`${styles.asideItem} ${styles.filterVendor}`}>
                            <div className={styles.asideTitle}>
                                <h2 className={styles.titleHead}><span>Thương hiệu</span></h2>
                            </div>
                            <div className={`${styles.asideContent} ${styles.filterGroup}`}>
                                <div className={styles.fieldSearch}>
                                    <input type="text"
                                           onChange={(e)=>setBrandName(e.target.value)}
                                           placeholder="Tìm Thương hiệu"
                                           className={styles.formControl}/>
                                    <span className={styles.inputGroupBtn}>
                                        <button className={`${styles.btn} ${styles.btnDefault}`}
                                            onClick={handleSearchByBrand}
                                        >
                                            <CiSearch />
                                        </button>
                                    </span>
                                </div>

                                <ul className={styles.filterVendor}>
                                    {brands && brands.map((brand) => (
                                        <li key={brand.brandId}
                                            className={`${styles.filterItem} ${styles.filterItemCheckBox} ${styles.filterItemGreen}`}>
                                            <label data-filter="california" htmlFor={brand.brandName}
                                                   className={styles.california}>
                                                <input type="checkbox" id={brand.brandName} checked={brand.brandName === brandName}
                                                       onChange={() => setBrandName(brand.brandName)}/>
                                                <i className="fa"></i>
                                                {brand.brandName}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>

                        <aside className={`${styles.asideItem} ${styles.filterType}`}>
                            <div className={styles.asideTitle}>
                                <h2 className={`${styles.titleHead} ${styles.marginTop0}`}><span>Loại</span></h2>
                            </div>
                            <div className={styles.asideContent}>
                                <div className={styles.fieldSearch}>
                                    <input type="text"
                                           onChange={(e)=>setFamilyName(e.target.value)}
                                           placeholder="Tìm loại sản phẩm"
                                           className={styles.formControl}/>
                                    <span className={styles.inputGroupBtn}>
                                    <button className="btn btn-default" onClick={handleSearchByFamily}><CiSearch /></button>
                                </span>
                                </div>
                                <ul className={styles.filterVendor}>
                                    {productFamilies && productFamilies.filter((family) =>
                                        family.category.categoryName === categoryName
                                    ).map((family) => (
                                        <li key={family.familyId}
                                            className={`${styles.filterItem} ${styles.filterItemCheckBox} ${styles.filterItemGreen}`}>
                                            <label data-filter="california" htmlFor={family.familyName}
                                                   className={styles.california}>
                                                <input type="checkbox" id={family.familyName} checked={family.familyName === familyName}
                                                       onChange={() => handleChangeFamily(family.familyName)} />
                                                <i className={styles.fa}></i>
                                                {family.familyName}
                                            </label>
                                        </li>
                                    ))}

                                </ul>
                            </div>
                        </aside>

                        <aside className={`${styles.asideItem} ${styles.filterPrice}`}>
                            <div className={styles.asideTitle}>
                                <h2 className={`${styles.titleHead} ${styles.marginTop0}`}><span>Giá sản phẩm</span>
                                </h2>
                            </div>
                            <div className={styles.asideContent}>
                                <ul className={styles.filterVendor}>
                                    <li className={`${styles.filterItem} ${styles.filterItemCheckBox} ${styles.filterItemGreen}`}>
                                        <label data-filter="california" htmlFor="filter-below-fivehu"
                                               className={styles.california}>
                                            <input type="checkbox" id="filter-below-fivehu"
                                                   checked={priceFilter === "Giá dưới 500.000đ"}
                                                   onChange={() => setPriceFilter("Giá dưới 500.000đ")}/>
                                            <i className="fa"></i>
                                            Giá dưới 500.000đ
                                        </label>
                                    </li>

                                    <li className={`${styles.filterItem} ${styles.filterItemCheckBox} ${styles.filterItemGreen}`}>
                                        <label data-filter="california" htmlFor="filter-fivehu-to-fivemi"
                                               className={styles.california}>
                                            <input type="checkbox" id="filter-fivehu-to-fivemi"
                                                   checked={priceFilter === "500.000đ - 5.000.000đ"}
                                                   onChange={() => setPriceFilter("500.000đ - 5.000.000đ")}/>
                                            <i className="fa"></i>
                                            500.000đ - 5.000.000đ
                                        </label>
                                    </li>

                                    <li className={`${styles.filterItem} ${styles.filterItemCheckBox} ${styles.filterItemGreen}`}>
                                        <label data-filter="california" htmlFor="filter-fivebi-to-twentybi"
                                               className={styles.california}>
                                            <input type="checkbox" id="filter-fivebi-to-twentybi"
                                                   checked={priceFilter === "5.000.000đ - 20.000.000đ"}
                                                   onChange={() => setPriceFilter("5.000.000đ - 20.000.000đ")}/>
                                            <i className="fa"></i>
                                            5.000.000đ - 20.000.000đ
                                        </label>
                                    </li>

                                    <li className={`${styles.filterItem} ${styles.filterItemCheckBox} ${styles.filterItemGreen}`}>
                                        <label data-filter="california" htmlFor="filter-more-than-fivebi"
                                               className={styles.california}>
                                            <input type="checkbox" id="filter-more-than-fivebi"
                                                   checked={priceFilter === "Giá trên 20.000.000đ"}
                                                   onChange={() => setPriceFilter("Giá trên 20.000.000đ")}/>
                                            <i className="fa"></i>
                                            Giá trên 20.000.000đ
                                        </label>
                                    </li>

                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>

                <div className={styles.searchByFilter}>
                    <button onClick={handleSearchByFilter}>Tìm kiếm</button>
                </div>
            </div>
        </aside>
    );
}