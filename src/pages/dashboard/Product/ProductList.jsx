import {DashboardMain} from "../../../components/DashboardMain/DashboardMain";
import {TiArrowUnsorted} from "react-icons/ti";
import {MdOutlineModeEdit} from "react-icons/md";
import {BiSolidShow} from "react-icons/bi";
import {IoTrashSharp} from "react-icons/io5";
import "./ProductList.scss";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as productsService from "../../../core/services/ProductService";
import warning from "../../../assets/images/warning.png";
import Modal from "../../../components/modal/Modal";

export function ProductList() {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState({});
    const [pageNumber, setPageNumber] = useState(0);
    const [open, setOpen] = useState();
    const navigate = useNavigate();
    const [productDelete, setProductDelete] = useState({
        productCode: "",
        productName: ""
    });

    useEffect(() => {

        const fetchProducts = async () => {
            await getProductsList("", "", "", "", "", 0, 9999999999);
        }
        fetchProducts().then().catch(console.error);
    }, []);

    const getProductsList = async (page, nameSearch, familyName, categoryName, brandName, priceBefore, priceAfter) => {
        const temp = await productsService.getAllProducts(page, nameSearch, familyName, categoryName, brandName, priceBefore, priceAfter);
        setProducts(temp.content);
        setTotalPages(temp.totalPages)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = (productName, productCode) => {
        setProductDelete({
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

    return (
        <DashboardMain content={
            <main id='product'>
                <div className="content-element">
                    <div className="header-content">
                        <form className="form-search">
                            <input type="text" className="search-bar"
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
                                        <a>
                                            <BiSolidShow fill="#3dc8d8"/>
                                        </a>
                                        <Link to={`/dashboard/products/create/${product.productId}`}>
                                            <MdOutlineModeEdit fill="#00a762"/>
                                        </Link>
                                        <a>
                                            <IoTrashSharp fill="red" onClick={() => handleOpen(product.productName, product.productCode)}/>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
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
                <Modal isOpen={open}>
                    <div className="head-modal">
                        <img src={warning} alt="warning"/>
                    </div>
                    <div>
                        <input id="productIdDelete" name="productIdDelete" type="hidden"/>
                        <h2>Bạn có chắc muốn xoá sản phẩm <span id="productName">{productDelete.productName}</span>?
                        </h2>
                        <p>Mã sản phẩm: <span id="productId">{productDelete.productCode}</span></p>
                        <svg className="modal-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                             preserveAspectRatio="none">
                            <rect x="0" y="0" fill="none" width="226" height="162" rx="3" ry="3"></rect>
                        </svg>
                        <div className="modal-footer">
                            <button type="button" className="btn-accept">Accept</button>
                            <button type="button" className="btn-accept btn-cancel" onClick={handleClose}>Cancel
                            </button>
                        </div>
                    </div>

                </Modal>
            </main>
        }/>
    );
}