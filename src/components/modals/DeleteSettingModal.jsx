import styles from "./DeleteSettingModal.module.scss";
import {useEffect, useState} from "react";
import * as categoryService from "../../core/services/CategoryService";
import * as brandService from "../../core/services/BrandService";
import * as productFamilyService from "../../core/services/ProductFamilyService";
import {toast} from "react-toastify";

export function DeleteSettingModal({isOpen, onClose, titleDelete, onDeleteSuccess}) {
    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [productFamilies, setProductFamilies] = useState([]);
    const [categoryDelete, setCategoryDelete] = useState(null);
    const [brandDelete, setBrandDelete] = useState(null);
    const [productFamilyDelete, setProductFamilyDelete] = useState(null);

    useEffect(() => {
        console.log(titleDelete)
        const fetchDatas = async () => {
            if (titleDelete === 'category') {
                setTitle("danh mục");
                await getCategories();
            }
            if (titleDelete === 'brand') {
                setTitle("thương hiệu");
                await getBrands();
            }
            if (titleDelete === 'productFamily') {
                setTitle("loại sản phẩm");
                await getProductFamilies();
            }
        }
        fetchDatas().then().catch();
    }, [titleDelete]);

    const getCategories = async () => {
        const temp = await categoryService.getAllCategories();
        setCategories(temp);
    }

    const getBrands = async () => {
        const temp = await brandService.getAllBrand();
        setBrands(temp);
    }

    const getProductFamilies = async () => {
        const temp = await productFamilyService.getAllProductFamilies();
        setProductFamilies(temp);
    }

    const handleChangeCategoryDelete = (event) => {
        console.log(event.target.value);
        setCategoryDelete(event.target.value)
    }

    const handleChangeBrandDelete = (event) => {
        console.log(event.target.value);
        setBrandDelete(event.target.value)
    }

    const handleChangeProductFamilyDelete = (event) => {
        console.log(event.target.value);
        setProductFamilyDelete(event.target.value)
    }

    const handleDelete = async () => {
        if (categoryDelete !== null) {
            try {
                const temp = await categoryService.deleteCategory(categoryDelete);
                toast.success("Xóa danh mục thành công!");
                await getCategories();
            } catch (error) {
                toast.error(error.message);
            }
        }
        if (brandDelete !== null) {
            try {
                const temp = await brandService.deleteBrand(brandDelete);
                toast.success("Xóa thương hiệu thành công!");
                await getBrands();
            } catch (error) {
                toast.error(error.message);
            }
        }
        if (productFamilyDelete !== null) {
            try {
                const temp = await productFamilyService.deleteProductFamilies(productFamilyDelete);
                toast.success("Xóa loại sản phẩm thành công!");
                await getProductFamilies();
            } catch (error) {
                toast.error(error.message);
            }
        }
        onDeleteSuccess();
    }

    return (
        <div className={`${styles.modal} ${isOpen ? styles.open : ''}`}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Chọn một {title} để xóa:</h2>
                </div>
                <div className={styles.modalBody}>
                    { titleDelete === 'category' && (
                        <select onChange={(e) => handleChangeCategoryDelete(e)}>
                            <option value="">--Chọn một danh mục--</option>
                            {categories && categories.map((category) => (
                                <option key={category.categoryId}
                                        value={category.categoryId}>{category.categoryName}</option>
                            ))}
                        </select>
                    )}
                    { titleDelete === 'brand' && (
                        <select onChange={(e) => handleChangeBrandDelete(e)}>
                            <option value="">--Chọn một thương hiệu--</option>
                            {brands && brands.map((brand) => (
                                <option key={brand.brandId}
                                        value={brand.brandId}>{brand.brandName}</option>
                            ))}
                        </select>
                    )}
                    { titleDelete === 'productFamily' && (
                        <select onChange={(e) => handleChangeProductFamilyDelete(e)}>
                            <option value="">--Chọn một loại sản phẩm--</option>
                            {productFamilies && productFamilies.map((familly) => (
                                <option key={familly.familyId}
                                        value={familly.familyId}>{familly.familyName}</option>
                            ))}
                        </select>
                    )}
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.acceptDelete} onClick={handleDelete}>Đồng ý</button>
                    <button className={styles.cancel} onClick={onClose}>Huỷ bỏ</button>
                </div>
            </div>
        </div>
    );
}