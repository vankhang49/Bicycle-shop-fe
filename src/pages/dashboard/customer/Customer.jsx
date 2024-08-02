import {DashboardMain} from "../../../components/DashboardMain/DashboardMain";
import {TiArrowUnsorted} from "react-icons/ti";
import {BiSolidShow} from "react-icons/bi";
import {MdOutlineModeEdit} from "react-icons/md";
import {IoTrashSharp} from "react-icons/io5";
import "./Customer.scss";
import {useEffect, useState} from "react";
import * as userService from "../../../core/services/UserService";
import {useForm} from "react-hook-form";
import * as productsService from "../../../core/services/ProductService";

export function Customer() {
    const [customers, setCustomers] = useState([]);
    const [totalPages, setTotalPages] = useState({});
    const [pageNumber, setPageNumber] = useState(0);
    const [message, setMessage] = useState(null);

    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        criteriaMode: "all"
    });
    useEffect(() => {
        const fetchData = async () => {
            await getAllCustomers('','');
        }
        fetchData()
    }, []);

    const getAllCustomers = async (searchContent, page) => {
        const temp = await userService.getAllCustomer(searchContent, page);
        setCustomers(temp.content);
        setTotalPages(temp.totalPages)
    }

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
            const temp = await userService.getAllCustomer(data.searchContent, pageNumber);
            setCustomers(temp.content);
            setTotalPages(temp.totalPages);
            setMessage(null);
        } catch (e) {
            setCustomers([]);
            setMessage(e);
        }
    }

    return(
        <DashboardMain content={
            <main id='customer'>
                <div className="content-element">
                    <div className="header-content">
                        <form className="form-search" onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" className="search-bar" {...register("searchContent")}
                                   placeholder="Nhập nội dung tìm kiếm"/>
                            <button className="btn btn-search">Tìm kiếm</button>
                        </form>
                        <a className="link-move">Thêm mới khách hàng</a>
                    </div>
                    <div className="box-content">
                        <p>Danh sách khách hàng</p>
                        <table className="table">
                            <thead>
                            <tr>
                                <th className={"no"}>
                                    STT
                                </th>
                                <th className={"customer-code"}>
                                    <span>Mã khách hàng</span>
                                    <button className="sort-button">
                                        <TiArrowUnsorted/>
                                    </button>
                                </th>
                                <th className={"customer-name"}>
                                    <span>Họ và tên</span>
                                    <button className="sort-button">
                                        <TiArrowUnsorted/>
                                    </button>
                                </th>
                                <th className={"gender"}>
                                    <span>Giới tính</span>
                                    <button className="sort-button">
                                        <TiArrowUnsorted/>
                                    </button>
                                </th>
                                <th className={"email"}>
                                    email
                                </th>
                                <th className={"phone-number"}>
                                    số điện thoại
                                </th>
                                <th className={"edit-customer"}>Chỉnh sửa</th>
                            </tr>
                            </thead>
                            <tbody>
                            {customers && customers.map((customer, index) => (
                                <tr key={customer.userId}>
                                    <td className={"no"}>{index + 1}</td>
                                    <td className={"customer-code"}>{customer.userCode}</td>
                                    <td className={"customer-name"}>{customer.fullName}</td>
                                    <td className={"gender"}>
                                        {customer.gender === 0 ? "Nam" : customer.gender === 1 ? "Nữ" : "Khác"}
                                    </td>
                                    <td className={"email"}>{customer.email}</td>
                                    <td className={"phone-number"}>{customer.phoneNumber}</td>
                                    <td className={"edit-customer"}>
                                        <a>
                                            <BiSolidShow fill="#3dc8d8"/>
                                        </a>
                                        <a>
                                            <MdOutlineModeEdit fill="#00a762"/>
                                        </a>
                                        <a>
                                            <IoTrashSharp fill="red"/>
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
            </main>
        }/>
    );
}