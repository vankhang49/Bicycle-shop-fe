import {DashboardMain} from "../../../components/DashboardMain/DashboardMain";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import * as categoryService from "../../../core/services/CategoryService";
import * as productFamilyService from "../../../core/services/ProductFamilyService";
import * as promotionService from "../../../core/services/PromotionService";
import * as colorService from "../../../core/services/ColorService";
import * as brandService from "../../../core/services/BrandService";
import * as productService from "../../../core/services/ProductService";
import {UploadMultipleImage, UploadOneImage} from "../../../firebase/UploadImage";
import "./createProduct.scss";
import Editor from "../../../components/Editer";
import {toast} from "react-toastify";
import { FaArrowsRotate } from "react-icons/fa6";

export function CreateProduct() {
    const {id} = useParams();
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const [productFamilies, setProductFamilies] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [colors, setColors] = useState([]);
    const [brands, setBrands] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [categorySelect, setCategorySelect] = useState(null);
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}, setValue, control} = useForm({
        defaultValues: {
            pricingList: [],
            productImages: [],
        }
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: "pricingList"
    });

    useEffect(() => {
        const fetchData = async () => {
            await getCategories();
            await getProductFamilies();
            await getPromotions();
            await getColors();
            await getAllBrand();
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (id !== undefined) {
                await getProductById(id);
            }
        }
        fetchData().then().catch();
    }, [id])

    const getProductById = async (id) => {
        const temp = await productService.findProductById(id);
        if (temp) {
            setProduct(temp);
            setValue("productId", temp.productId);
            setValue("productName", temp.productName);
            setValue("productCode", temp.productCode);
            setCategorySelect(temp.productFamily.category);
            setValue("productFamily", JSON.stringify(temp.productFamily));
            setValue("brand", JSON.stringify(temp.brand));
            setDescription(temp.description);
            setContent(temp.content);
            setValue("dateCreate", temp.dateCreate);
            setProductImages(temp.productImages);
            setValue("productImages", temp.productImages);
            setValue("deleteFlag", temp.deleteFlag);
            const pricingList = temp.pricingList.map((pricing) => ({
                priceId: pricing.priceId,
                priceCode: pricing.priceCode,
                priceName: pricing.priceName,
                price: pricing.price,
                size: pricing.size,
                inventory: pricing.inventory,
                color: JSON.stringify(pricing.color),
                imgColor: pricing.imgColor,
                promotion: JSON.stringify(pricing.promotion)
            }))
            setValue('pricingList', pricingList);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (id === undefined) {
                await randomProductCode();
            }
        }
        fetchData();
    }, [categorySelect]);

    const getCategories = async () => {
        const temp = await categoryService.getAllCategories();
        setCategories(temp);
    }

    const getProductFamilies = async () => {
        const temp = await productFamilyService.getAllProductFamilies();
        setProductFamilies(temp);
    }

    const getPromotions = async () => {
        const temp = await promotionService.getAllPromotions();
        setPromotions(temp)
    }

    const getColors = async () => {
        const temp = await colorService.getAllColors();
        setColors(temp)
    }

    const getAllBrand = async () => {
        const temp = await brandService.getAllBrand();
        setBrands(temp);
    }

    const randomProductCode = async () => {
        let code;
        const randomFourDigitNumber = Math.floor(1000 + Math.random() * 9000);
        switch (categorySelect?.categoryId) {
            case 1:
                code = "XD";
                break;
            case 2:
                code = "PT";
                break;
            case 3:
                code = "PK";
                break;
            case 4:
                code = "TP";
                break;
            case 5:
                code = "DV";
                break;
            default:
                break;
        }
        code += randomFourDigitNumber;
        setValue("productCode", code);
    }

    const randomPriceCode = async (index) => {
        let code = "P";
        const randomFourDigitNumber = Math.floor(1000 + Math.random() * 9000);
        code += randomFourDigitNumber;
        setValue(`pricingList[${index}].priceCode`, code);
    }

    const handleAddPricingRow = async () => {
        append({});
        await randomPriceCode(fields.length);
    };

    const handleRemovePricingRow = (index) => {
        remove(index);
    };

    const handleImageUrlChange = async (uploadedImageUrls) => {
        // Đảm bảo rằng đã có giá trị hiện tại của productImages
        const currentImages = productImages.map(img => ({...img}));

        for (let url of uploadedImageUrls) {
            currentImages.push({imageUrl: url});
        }

        await setValue('productImages', currentImages);
        await setProductImages(currentImages);
    }

    const handleOneImageUrlChange = async (uploadedImageUrl, index) => {
        await setValue(`pricingList[${index}].imgColor`, uploadedImageUrl);
    }

    const onSubmit = async (data) => {
        try {
            if (data.brand === '') {
                data.brand = null;
            } else {
                data.brand = JSON.parse(data.brand);
            }
            console.log(data)
            data.productFamily = JSON.parse(data.productFamily);
            data.pricingList = data.pricingList.map(item => ({
                ...item,
                color: JSON.parse(item.color),
                promotion: JSON.parse(item.promotion)
            }))
            data.content = content;
            data.description = description;
            data.productImages = productImages;
            console.log(data)
            if (id === undefined) {
                await productService.saveProduct(data);
                toast.success("Thêm mới thành công!");
            } else {
               await productService.updateProduct(data);
                toast.success("Cập nhật thành công!");
            }
            navigate("/dashboard/products");
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleChangeCategory = (e) => {
        setCategorySelect(JSON.parse(e.target.value));
    }

    const handleChangeContent = (value) => {
        setContent(value);
    }
    const handleChangeDescription = (value) => {
        setDescription(value);
    }

    const handleRemoveImg = (index) => {
        const temp = productImages.splice(index, 1);
        setProductImages(temp);
    }

    return(
        <DashboardMain path={'products'} content={
            <main id='create-product'>
                <div className="content-element">
                    <div className="form-title">
                        <p className="title">{id === undefined ? "Thêm mới" : "Cập nhật"} sản phẩm</p>
                    </div>
                    <form className="form-operation" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-element">
                            <label>Mã sản phẩm:</label>
                            <input type="text" disabled name={"productCode"} className="form-label"
                                   {...register("productCode", {
                                       required: "Không được để trống!",
                                       pattern: {
                                           value: /^[A-Z]{2}[0-9A-Z]{4}$/,
                                           message: "Vui lòng nhập đúng định dạng, mã sản phẩm chỉ phải bắt đầu bằng 2 chữ " +
                                               "cái in hoa và kết thúc bằng 4 ký tự chỉ bao gồm số và chữ!"
                                       }
                                   })}
                            />
                            {errors.productCode && <p className="validate-error">{errors.productCode.message}</p>}
                        </div>
                        <div className="form-element">
                            <label>Tên sản phẩm:</label>
                            <input type="text" name={"productName"} className="form-label"
                                   {...register("productName", {
                                       required: "Không được để trống!"
                                   })}
                            />
                            {errors.productName && <p className="validate-error">{errors.productName.message}</p>}
                        </div>
                        {id === undefined ?
                            <div className="form-element">
                                <label>Danh mục:</label>
                                <select id="categorySelect" onChange={(e) => handleChangeCategory(e)}>
                                    <option value="">--Chọn danh mục--</option>
                                    {categories && categories.map((category) => (
                                        <option key={category.categoryId}
                                                value={JSON.stringify(category)}>{category.categoryName}</option>
                                    ))}
                                </select>
                            </div> : ''}
                        {categorySelect !== null ?
                            <div className="form-element">
                                <label>Loại sản phẩm:</label>
                                <select id="productFamilySelect" {...register("productFamily")}>
                                    <option value="">--Chọn loại sản phẩm--</option>
                                    {
                                        productFamilies?.filter((family) =>
                                        family.category.categoryId === categorySelect.categoryId
                                    )?.map((family) => (
                                        <option key={family.familyId}
                                                value={JSON.stringify(family)}>{family.familyName}</option>
                                    ))}
                                </select>
                            </div>
                            : null}
                        {categorySelect !== null ?
                            <div className="form-element">
                                <label>Thương hiệu:</label>
                                <select id="brandSelect" {...register("brand")}>
                                    <option value="">--Chọn thương hiệu--</option>
                                    {
                                        brands?.filter((brand) =>
                                        brand.category.categoryId === categorySelect.categoryId
                                    )?.map((brand) => (
                                        <option key={brand.brandId}
                                                value={JSON.stringify(brand)}>{brand.brandName}</option>
                                    ))}
                                </select>
                            </div>
                            : null}
                        <div className="form-element">
                            <label>Mô tả ngắn:</label>
                            {/*<textarea {...register("description")} rows={7} className="form-label" defaultValue={""}/>*/}
                            <Editor value={description} onChange={handleChangeDescription} className='form-label'/>
                            <p className="validate-error"/>
                        </div>
                        <div className="form-element">
                            <label>Mô tả sản phẩm:</label>
                            {/*<textarea {...register("description")} rows={7} className="form-label" defaultValue={""}/>*/}
                            <Editor value={content} onChange={handleChangeContent} className='form-label'/>
                            <p className="validate-error"/>
                        </div>
                        <div className="form-element">
                            <label>Hình ảnh sản phẩm:</label>
                            <div className="image-input">
                                <UploadMultipleImage className={'form-label'} onImageUrlChange={handleImageUrlChange}/>
                            </div>
                            <div className="img-list">
                                {productImages?.map((image, index) => (
                                    <div className="img-element">
                                        <img src={image.imageUrl} alt={image.imageId}/>
                                        <div className="remove-img"
                                             onClick={()=> handleRemoveImg(index)}>X</div>
                                    </div>
                                ))}
                            </div>
                            <p className="validate-error"/>
                        </div>
                        <div className="form-element">
                            <label>Kích thước, màu sắc, giá cả:</label>
                            <div className="form-pricing">
                                {fields.map((item, index) => (
                                    <div key={index} className="price-of-product">
                                        <div className="row-pricing">
                                            <span>No {index + 1}</span>
                                            <button type="button"
                                                    style={index === 0 ? {visibility: 'hidden'} : {visibility: 'visible'}}
                                                    onClick={() => handleRemovePricingRow(index)}>
                                                -
                                            </button>
                                        </div>

                                        <div className="priceCode">
                                            <input type="text" disabled {...register(`pricingList[${index}].priceCode`)}
                                                   placeholder={"Mã sản phẩm chi tiết"} className="form-label-child"/>
                                            <FaArrowsRotate onClick={() => randomPriceCode(index)}/>
                                        </div>

                                        <input type="text" {...register(`pricingList[${index}].priceName`)}
                                               placeholder={"Tên sản phẩm chi tiết"} className="form-label-child"/>

                                        <input {...register(`pricingList[${index}].size`)} type="text"
                                               placeholder="size" className="form-label-child size"/>

                                        <select {...register(`pricingList[${index}].color`)}
                                                className="form-label-child color">
                                            <option value='' >-- Chọn một màu sắc --</option>
                                            {
                                                colors?.map((color, colorIndex) => (
                                                <option value={JSON.stringify(color)}
                                                        key={color.colorId}>{color.colorName}</option>
                                            ))}
                                        </select>

                                        <input {...register(`pricingList[${index}].price`)} type="text"
                                               placeholder="giá cả"
                                               className="form-label-child price"/>

                                        <select {...register(`pricingList[${index}].promotion`)}
                                                className="form-label-child promotion">
                                            <option value=''>-- Chọn một mức giảm giá --</option>
                                            {
                                                promotions?.map((promotion) => (
                                                <option value={JSON.stringify(promotion)}
                                                        key={promotion.promotionId}>{promotion.promotionName}</option>
                                            ))}
                                        </select>
                                        <input type="text" {...register(`pricingList[${index}].inventory`)}
                                               placeholder="số lượng" className="form-label-child quantity"/>

                                        <UploadOneImage className='form-label-child'
                                                        onImageUrlChange={(url) => handleOneImageUrlChange(url, index)}
                                        />
                                    </div>
                                ))}
                                <div className="btn-add-price">
                                    <button type="button" onClick={handleAddPricingRow}>
                                        +
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div className="btn-submit">
                            <button type="submit">Đăng bán</button>
                        </div>
                    </form>
                </div>
            </main>
        }/>
    );
}