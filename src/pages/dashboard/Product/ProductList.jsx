import {TiArrowUnsorted} from "react-icons/ti";
import {MdOutlineModeEdit} from "react-icons/md";
import {IoTrashSharp} from "react-icons/io5";
import "./ProductList.scss";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import * as productsService from "../../../core/services/ProductService";
import {useForm} from "react-hook-form";
import {DeleteProductModal} from "./DeleteProductModal/DeleteProductModal";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState({});
    const [pageNumber, setPageNumber] = useState(0);
    const [message, setMessage] = useState(null);
    const [open, setOpen] = useState(false);

    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        criteriaMode: "all"
    });
    const [productDelete, setProductDelete] = useState({
        productId : null,
        productCode: "",
        productName: ""
    });

    useEffect(() => {

        const fetchProducts = async () => {
            await getProductsList('', pageNumber);
        }
        fetchProducts().then().catch(console.error);
    }, []);

    const getProductsList = async (searchContent , page) => {
        const temp = await productsService.getAllProductsAuth(searchContent, page);
        setProducts(temp.content);
        setTotalPages(temp.totalPages)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = (productId, productName, productCode) => {
        setProductDelete({
            productId: productId,
            productCode: productCode,
            productName: productName
        })
        setOpen(true);
    };

    const handlePage = (pageNo) => {
        setPageNumber(pageNo);
    }

    const showPageNo = () => {
        let pageNoTags = [];
        for (let i = 0; i < totalPages; i++) {
            pageNoTags.push(<a key={i} className="page-a" onClick={() => handlePage(i)}>{i + 1}</a>);
        }
        return pageNoTags;
    }

    const onSubmit = async (data) => {
        try {
            const temp = await productsService.getAllProductsAuth(data.searchContent, pageNumber);
            setProducts(temp.content);
            setTotalPages(temp.totalPages);
            setMessage(null);
        } catch (e) {
            setProducts([]);
            setMessage(e);
        }
    }

    const handleUpdateProductFlag = async () => {
        setOpen(false);
        await getProductsList('' , pageNumber);
    }

    return (
        <main id='product'>
                <div className="content-element">
                    <div className="header-content">
                        <form className="form-search" onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" className="search-bar" {...register("searchContent")}
                                   placeholder="Nhập nội dung tìm kiếm"/>
                            <button className="btn btn-search">Tìm kiếm</button>
                        </form>
                        <Link to="/dashboard/products/create" className="link-move">Thêm mới sản phẩm</Link>
                    </div>
                    <div className="box-content">
                        <p>Danh sách sản phẩm</p>
                        <table className="table">
                            <thead>
                            <tr>
                                <th className={"no"}>
                                    STT
                                </th>
                                <th className={"product-code"}>
                                    <span>Mã sản phẩm</span>
                                    <button className="sort-button">
                                        <TiArrowUnsorted/>
                                    </button>
                                </th>
                                <th className={"product-name"}>
                                    <span>Tên sản phẩm</span>
                                    <button className="sort-button">
                                        <TiArrowUnsorted/>
                                    </button>
                                </th>
                                <th className={"brand"}>
                                    <span>Thương hiệu</span>
                                    <button className="sort-button">
                                        <TiArrowUnsorted/>
                                    </button>
                                </th>
                                <th className={"date-create"}>
                                    Ngày đăng bán
                                </th>
                                <th className={"edit-product"}>Chỉnh sửa</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products && products.map((product, index) => (
                                <tr key={product.id}>
                                    <td className={"no"}>{index + 1}</td>
                                    <td className={"product-code"}>{product.productCode}</td>
                                    <td className={"product-name"}>{product.productName}</td>
                                    <td className={"brand"}>{product.brand.brandName}</td>
                                    <td className={"date-create"}>{product.dateCreate}</td>
                                    <td className={"edit-product"}>
                                        <Link to={`/dashboard/products/create/${product.productId}`}>
                                            <MdOutlineModeEdit fill="#00a762"/>
                                        </Link>
                                        <a>
                                            <IoTrashSharp fill="red" onClick={() => handleOpen(product.productId ,product.productName, product.productCode)}/>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {message !== null && <p>{message}</p>}
                    </div>
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
                </div>
                <DeleteProductModal
                    isOpen={open}
                    onClose={handleClose}
                    productDelete={productDelete}
                    onDeleteSuccess={handleUpdateProductFlag}
                />
            </main>
    );
}