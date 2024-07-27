import {DashboardMain} from "../../../components/DashboardMain/DashboardMain";
import "./Setting.scss";
import {useEffect, useState} from "react";
import * as categoryService from "../../../core/services/CategoryService";
import * as brandService from "../../../core/services/BrandService";
import * as productFamilyService from "../../../core/services/ProductFamilyService";
import {DeleteSettingModal} from "../../../components/modal/DeleteSettingModal";
import {toast} from "react-toastify";

export function Setting() {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [productFamilies, setProductFamilies] = useState([]);

    const [categorySelected, setCategorySelected] = useState('');
    const [showInputCategory, setShowInputCategory] = useState(false);
    const [showInputBrand, setShowInputBrand] = useState(false);
    const [showInputProductFamily, setShowInputProductFamily] = useState(false);
    const [newCategory, setNewCategory] = useState(null);
    const [newBrand, setNewBrand] = useState(null);
    const [newProductFamily, setNewProductFamily] = useState(null);

    const [titleDelete, setTitleDelete] = useState('');
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);


    useEffect(()=> {
        const fetchData = async () => {
            await getCategories();
            await getBrands();
            await getProductFamilies();
        }
        fetchData().then().catch();
    }, [])

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

    const handleChangeCategorySelected = (event) => {
        if (event.target.value !== '') {
            const temp = JSON.parse(event.target.value);
            setCategorySelected(temp);
        } else {
            setCategorySelected('');
        }
    }

    const handleShowNewCategoryInput = () => {
        setShowInputCategory(!showInputCategory);
    }

    const handleShowNewBrandInput = () => {
        setShowInputBrand(!showInputBrand);
    }

    const handleShowNewProductFamilyInput = () => {
        setShowInputProductFamily(!showInputProductFamily);
    }

    const handleChangeAddNewCategory = (event) => {
        const temp = event.target.value;
        setNewCategory(temp);
    }

    const handleChangeAddNewBrand = (event) => {
        const temp = event.target.value;
        setNewBrand(temp);
    }

    const handleChangeAddNewProductFamily = (event) => {
        const temp = event.target.value;
        setNewProductFamily(temp);
    }

    const handleAddNewCategory = async () => {
        const req = {
            categoryName : newCategory,
        }
        try {
            const temp = await categoryService.saveCategory(req);
            toast.success("Thêm mới danh mục thành công!");
            await getCategories();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleAddNewBrand = async() => {
        const req = {
            brandName : newBrand,
            category : categorySelected,
        }
        try {
            const temp = await brandService.saveBrand(req);
            toast.success("Thêm mới thương hiệu thành công!");
            await getBrands();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleAddNewProductFamily = async () => {
        const req = {
            familyName : newProductFamily,
            category : categorySelected,
        }
        try {
            const temp = await productFamilyService.saveProductFamilies(req);
            toast.success("Thêm mới loại sản phẩm thành công!");
            await getProductFamilies();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleOpenDeleteModal = (title) => {
        setTitleDelete(title);
        setIsModalDeleteOpen(!isModalDeleteOpen);
    }

    const closeDeleteModal = () => setIsModalDeleteOpen(false);

    const handleUpdateEmployeeFlag = async () => {
        setIsModalDeleteOpen(false);
        if (titleDelete === 'category') {
            await getCategories();
        }
        if (titleDelete === 'brand') {
            await getBrands();
        }
        if (titleDelete === 'productFamily') {
            await getProductFamilies();
        }
    }

    return (
        <DashboardMain content={
            <main id='setting'>
                <div className="content-element">
                    <div className="box-content">
                        <p>Cài đặt</p>
                        <div className="setting-element category">
                            <div className="title">
                                <span>Các danh mục: </span>
                            </div>
                            <select onChange={(e) => handleChangeCategorySelected(e)}>
                                <option value="">--Danh mục--</option>
                                {categories && categories.map((category) => (
                                    <option key={category.categoryId} value={JSON.stringify(category)}>{category.categoryName}</option>
                                ))}
                            </select>
                            <div className="btn-setting new-category">
                                <button onClick={handleShowNewCategoryInput}>Thêm mới danh mục</button>
                            </div>
                            <div className="btn-setting">
                                <button className="remove-btn" onClick={() => handleOpenDeleteModal('category')}>Xóa danh mục</button>
                            </div>
                            {showInputCategory && (
                                <div className="add-new-form">
                                    <div className="title">
                                        <span>Thêm mới: </span>
                                    </div>
                                    <input type="text" placeholder={"Thêm mới danh mục"}
                                           onChange={(e) => handleChangeAddNewCategory(e)}/>
                                    <div className="btn-setting button-add-new">
                                        <button onClick={handleAddNewCategory}>Thêm mới</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="setting-element brand">
                            <div className="title">
                                <span>Các thương hiệu: </span>
                            </div>
                            <select>
                                <option value="">--Thương hiệu--</option>
                                {brands && brands.map((brand) => (
                                    <option key={brand.brandId} value={JSON.stringify(brand)}>{brand.brandName}</option>
                                ))}
                            </select>
                            <div className="btn-setting new-brand">
                                <button onClick={handleShowNewBrandInput}>Thêm mới một thương hiệu</button>
                            </div>
                            <div className="btn-setting">
                                <button className="remove-btn"
                                        onClick={() => handleOpenDeleteModal('brand')}>Xóa thương hiệu
                                </button>
                            </div>
                            {showInputBrand && (
                                <div className="add-new-form">
                                    <input type="text" disabled={categorySelected === ''}
                                           placeholder={"Thêm mới thương hiệu"}
                                           onChange={(e) => handleChangeAddNewBrand(e)}/>
                                    <div className="btn-setting button-add-new">
                                        <button onClick={handleAddNewBrand}>Thêm mới</button>
                                    </div>
                                    {categorySelected === '' &&
                                        <small>Vui lòng chọn một danh mục trước khi thêm mới<span
                                            style={{color: "red"}}>(*)</span></small>
                                    }
                                </div>
                            )}
                        </div>
                        <div className="setting-element product-family">
                            <div className="title">
                                <span>Các loại sản phẩm: </span>
                            </div>
                            <select>
                                <option value="">--Loại sản phẩm--</option>
                                {productFamilies && productFamilies.map((family) => (
                                    <option key={family.familyId}
                                            value={JSON.stringify(family)}>{family.familyName}</option>
                                ))}
                            </select>
                            <div className="btn-setting new-brand">
                                <button onClick={handleShowNewProductFamilyInput}>Thêm mới loại sản phẩm</button>
                            </div>
                            <div className="btn-setting">
                                <button className="remove-btn"
                                        onClick={() => handleOpenDeleteModal('productFamily')}>Xóa loại sản phẩm
                                </button>
                            </div>
                            {showInputProductFamily && (
                                <div className="add-new-form">
                                    <input type="text" disabled={categorySelected === ''}
                                           placeholder={"Thêm mới loại sản phẩm"}
                                           onChange={(e) => handleChangeAddNewProductFamily(e)}/>
                                    <div className="btn-setting button-add-new">
                                        <button onClick={handleAddNewProductFamily}>Thêm mới</button>
                                    </div>
                                    {categorySelected === '' &&
                                        <small>Vui lòng chọn một danh mục trước khi thêm mới<span
                                            style={{color: "red"}}>(*)</span></small>
                                    }
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                <DeleteSettingModal
                    isOpen={isModalDeleteOpen}
                    onClose={closeDeleteModal}
                    titleDelete = {titleDelete}
                    onDeleteSuccess={handleUpdateEmployeeFlag}
                />
            </main>

        }/>
    );
}