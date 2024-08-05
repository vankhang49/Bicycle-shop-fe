import {TiArrowUnsorted} from "react-icons/ti";
import {BiSolidShow} from "react-icons/bi";
import {MdOutlineModeEdit} from "react-icons/md";
import {IoTrashSharp} from "react-icons/io5";
import {DashboardMain} from "../../../components/DashboardMain/DashboardMain";
import "./Bill.scss";
import {useEffect, useState} from "react";
import * as billService from "../../../core/services/BillService";
import * as userService from "../../../core/services/UserService";
import {useForm} from "react-hook-form";
import {BillModal} from "../BillModal/BillModal";

export function Bills() {
    const [bills, setBills] = useState([]);
    const [totalPages, setTotalPages] = useState({});
    const [pageNumber, setPageNumber] = useState(0);
    const [message, setMessage] = useState(null);

    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        criteriaMode: "all"
    });

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [billId, setBillId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            await getAllBills('', '');
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            await getAllBills('', pageNumber);
        }
        fetchData();
    }, [pageNumber]);


    const getAllBills = async (searchContent, page) => {
        try {
            const temp = await billService.getAllBills(searchContent, page);
            setBills(temp.content);
            setTotalPages(temp.totalPages)
        } catch (error) {
            setMessage(error.message);
        }
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
            const temp = await billService.getAllBills(data.searchContent, pageNumber);
            setBills(temp.content);
            setTotalPages(temp.totalPages);
            setMessage(null);
        } catch (e) {
            setBills([]);
            setMessage(e.message);
        }
    }

    const handleOpenModal = (id) => {
        setBillId(id);
        setIsOpenModal(true);
    }

    const handleCloseModal = () => {
        setIsOpenModal(false);
    }

    return(
        <DashboardMain path={'bills'} content={
            <main id='bill'>
                <div className="content-element">
                    <div className="header-content">
                        <form className="form-search" onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" className="search-bar" {...register("searchContent")}
                                   placeholder="Nhập nội dung tìm kiếm"/>
                            <button className="btn btn-search">Tìm kiếm</button>
                        </form>
                    </div>
                    <div className="box-content">
                        <p>Danh sách đơn hàng</p>
                        <table className="table">
                            <thead>
                            <tr>
                                <th className={"no"}>
                                    STT
                                </th>
                                <th className={"bill-code"}>
                                    <span>Mã đơn hàng</span>
                                </th>
                                <th className={"customer"}>
                                    <span>Khách hàng</span>
                                </th>
                                <th className={"date-create"}>
                                    <span>Ngày</span>
                                </th>
                                <th className={"phone-number"}>
                                    số điện thoại
                                </th>
                                <th className={"status"}>
                                    Tình trạng
                                </th>
                                <th className={"edit-customer"}>Chỉnh sửa</th>
                            </tr>
                            </thead>
                            <tbody>
                            {bills && bills.map((bill, index) => (
                                <tr key={bill.id}>
                                    <td className={"no"}>{index + 1}</td>
                                    <td className={"bill-code"}>{bill.billCode}</td>
                                    <td className={"customer"}>{bill.appUser.fullName}</td>
                                    <td className={"date-create"}>{bill.dateCreate}</td>
                                    <td className={"phone-number"}>{bill.phoneNumber}</td>
                                    <td className={bill.paid ? "status done" : "status"}>
                                        {bill.paid ? "Đã giao hàng" : "Chưa giao hàng"}
                                    </td>
                                    <td className={"edit-customer"}>
                                        <a onClick={()=>handleOpenModal(bill.id)}>
                                            <BiSolidShow fill="#3dc8d8"/>
                                        </a>
                                        <a>
                                            <IoTrashSharp fill="red"/>
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
                            <a className="page-a">Trang trước</a>
                            <span>
                                    <a className="page-a">1</a>
                                    <a className="page-a">2</a>
                                    <a className="page-a">3</a>
                                    <a className="page-a">4</a>
                                </span>
                            <a className="page-a">Trang sau</a>
                        </div>
                    </div>
                </div>
                <BillModal
                    isOpen={isOpenModal}
                    onClose={handleCloseModal}
                    billId={billId}
                />
            </main>
        }/>
    );
}