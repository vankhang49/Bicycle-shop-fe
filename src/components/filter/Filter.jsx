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
    const [brandName, setBrandName] = useState("");
    const [familyName, setFamilyName] = useState("");
    const [priceFilter, setPriceFilter] = useState("");
    const [isOpenFilter, setIsOpenFilter] = useState(props.isOpenFilter);

    useEffect(() => {
        const fetchData = async () => {
            await getAllProductFamilies();
            await getAllBrandsByCategoryName(categoryName);
        }
        fetchData().then().catch(console.error);
    }, [categoryName])

    useEffect(() => {
        props.onBrandNameChange(brandName);
    }, [brandName, props]);

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
    }

    const handleChangeFamily = (family) => {
        setFamilyName(family);
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
                                                <div className={styles.buttonCancel} onClick={()=>setBrandName("")}>x</div>
                                            </li>
                                        }
                                        {familyName &&
                                            <li className={styles.selectedFilterItem}>
                                                {familyName}
                                                <div className={styles.buttonCancel} onClick={()=>setFamilyName("")}>x</div>
                                            </li>
                                        }
                                        {priceFilter &&
                                            <li className={styles.selectedFilterItem}>
                                                {priceFilter}
                                                <div className={styles.buttonCancel} onClick={()=>setPriceFilter("")}>x</div>
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
                                    <input type="text" placeholder="Tìm Thương hiệu" className={styles.formControl}/>
                                    <span className={styles.inputGroupBtn}>
                                        <button className={`${styles.btn} ${styles.btnDefault}`}>
                                            <CiSearch />
                                        </button>
                                    </span>
                                </div>

                                <ul className={styles.filterVendor}>
                                    {brands && brands.map((brand) => (
                                        <li key={brand.brandId}
                                            className={`${styles.filterItem} ${styles.filterItemCheckBox} ${styles.filterItemGreen}`}>
                                            <label data-filter="california" htmlFor="filter-california"
                                                   className={styles.california}>
                                                <input type="checkbox" id="filter-california" checked={brand.brandName === brandName}
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
                                    <input type="text" placeholder="Tìm Thương hiệu" className={styles.formControl}/>
                                    <span className={styles.inputGroupBtn}>
                                    <button className="btn btn-default"><CiSearch /></button>
                                </span>
                                </div>
                                <ul className={styles.filterVendor}>
                                    {productFamilies && productFamilies.filter((family) =>
                                        family.category.categoryName === categoryName
                                    ).map((family) => (
                                        <li key={family.familyId}
                                            className={`${styles.filterItem} ${styles.filterItemCheckBox} ${styles.filterItemGreen}`}>
                                            <label data-filter="california" htmlFor="familyName"
                                                   className={styles.california}>
                                                <input type="checkbox" id="familyName" checked={family.familyName === familyName}
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
                                <div className={styles.fieldSearch}>
                                    <input type="text" placeholder="Tìm Thương hiệu" className={styles.formControl}/>
                                    <span className={styles.inputGroupBtn}>
                                    <button className="btn btn-default"><CiSearch /></button>
                                </span>
                                </div>
                                <ul className={styles.filterVendor}>
                                    <li className={`${styles.filterItem} ${styles.filterItemCheckBox} ${styles.filterItemGreen}`}>
                                        <label data-filter="california" htmlFor="filter-california"
                                               className={styles.california}>
                                            <input type="checkbox" id="filter-california" onChange={()=>setPriceFilter("Giá dưới 500.000đ")}/>
                                            <i className="fa"></i>
                                            Giá dưới 500.000đ
                                        </label>
                                    </li>

                                    <li className={`${styles.filterItem} ${styles.filterItemCheckBox} ${styles.filterItemGreen}`}>
                                        <label data-filter="california" htmlFor="filter-california"
                                               className={styles.california}>
                                            <input type="checkbox" id="filter-california" onChange={()=>setPriceFilter("500.000đ - 5.000.000đ")}/>
                                            <i className="fa"></i>
                                            500.000đ - 5.000.000đ
                                        </label>
                                    </li>

                                    <li className={`${styles.filterItem} ${styles.filterItemCheckBox} ${styles.filterItemGreen}`}>
                                        <label data-filter="california" htmlFor="filter-california"
                                               className={styles.california}>
                                            <input type="checkbox" id="filter-california" onChange={()=>setPriceFilter("5.000.000đ - 20.000.000đ")}/>
                                            <i className="fa"></i>
                                            5.000.000đ - 20.000.000đ
                                        </label>
                                    </li>

                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </aside>
    );
}