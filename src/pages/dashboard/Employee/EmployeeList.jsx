import {DashboardMain} from "../../../components/DashboardMain/DashboardMain";
import {TiArrowUnsorted} from "react-icons/ti";
import {BiSolidShow} from "react-icons/bi";
import {MdCancel, MdOutlineModeEdit} from "react-icons/md";
import {IoTrashSharp} from "react-icons/io5";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import * as userService from "../../../core/services/UserService";
import "./EmployeeList.scss";
import {DisableUserModal} from "../DisableUserModal/DisableUserModal";
import {DeleteUserModal} from "../DeleteUserModal/DeleteUserModal";
import {UserDetailModal} from "../userDetailModal/userDetailModal";
import {Link} from "react-router-dom";


export function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [totalPages, setTotalPages] = useState({});
    const [pageNumber, setPageNumber] = useState(0);
    const currentUserId = Number.parseInt(localStorage.getItem("id"));
    const [message, setMessage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDisableOpen, setIsModalDisableOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [userId, setUserId] = useState(null);

    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        criteriaMode: "all"
    });

    const [userDisable, setUserDisable] = useState({
        userId: null,
        userCode: "",
        fullName: ""
    });

    const [userDelete, setUserDelete] = useState({
        userId: null,
        userCode: "",
        fullName: ""
    });


    useEffect(() => {
        const fetchData = async () => {
            await getAllEmployees('','');
        }
        fetchData()
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await getAllEmployees('',pageNumber);
        }
        fetchData()
    }, [pageNumber]);

    const getAllEmployees = async (searchContent, page) => {
        const temp = await userService.getAllEmployee(searchContent, page);
        setEmployees(temp.content);
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
            const temp = await userService.getAllEmployee(data.searchContent, pageNumber);
            setEmployees(temp.content);
            setTotalPages(temp.totalPages);
            setMessage(null);
        } catch (e) {
            setEmployees([]);
            setMessage(e);
        }
    }

    const openDetailModal = (id) => {
        setIsModalOpen(true);
        setUserId(id);
    }

    const openDisableModal = (user) => {
        setIsModalDisableOpen(true);
        setUserDisable({
            userId: user.userId,
            userCode: user.userCode,
            fullName: user.fullName
        });
    }

    const openDeleteModal = (user) => {
        setIsModalDeleteOpen(true);
        setUserDelete({
            userId: user.userId,
            userCode: user.userCode,
            fullName: user.fullName
        });
    }

    const closeDetailModal = () => setIsModalOpen(false);
    const closeDisableModal = () => setIsModalDisableOpen(false);
    const closeDeleteModal = () => setIsModalDeleteOpen(false);

    const handleUpdateUserFlag = async () => {
        setIsModalDisableOpen(false);
        setIsModalOpen(false);
        setIsModalDeleteOpen(false);
        await getAllEmployees('' , '');
    }

    return(
        <DashboardMain path={'employees'} content={
            <main id='employee'>
                <div className="content-element">
                    <div className="header-content">
                        <form className="form-search" onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" className="search-bar" {...register("searchContent")}
                                   placeholder="Nhập nội dung tìm kiếm"/>
                            <button className="btn btn-search">Tìm kiếm</button>
                        </form>
                        <Link  to="/dashboard/employees/create" className="link-move">Thêm mới nhân viên</Link>
                    </div>
                    <div className="box-content">
                        <p>Danh sách nhân viên</p>
                        <table className="table">
                            <thead>
                            <tr>
                                <th className={"no"}>
                                    STT
                                </th>
                                <th className={"customer-code"}>
                                    <span>Mã nhân viên</span>
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
                                <th className={"status"}>
                                    Trạng thái
                                </th>
                                <th className={"phone-number"}>
                                    Số điện thoại
                                </th>
                                <th className={"edit-customer"}>Chỉnh sửa</th>
                            </tr>
                            </thead>
                            <tbody>
                            {employees && employees.filter((employee) => employee.userId !== currentUserId
                            )?.map((employee, index) => (
                                <tr key={employee.userId}>
                                    <td className={"no"}>{index + 1}</td>
                                    <td className={"customer-code"}>{employee.userCode}</td>
                                    <td className={"customer-name"}>{employee.fullName}</td>
                                    <td className={"gender"}>
                                        {employee.gender === 0 ? "Nam" : employee.gender === 1 ? "Nữ" : "Khác"}
                                    </td>
                                    <td className={"status"}>
                                        {employee.enabled === true ?
                                            <span style={{color: "green"}}>Kích hoạt</span>
                                            : <span style={{color: "red"}}>Bất hoạt</span>
                                        }
                                    </td>
                                    <td className={"phone-number"}>{employee.phoneNumber}</td>
                                    <td className={"edit-customer"}>
                                        <a onClick={() => openDetailModal(employee.userId)}>
                                            <BiSolidShow fill="#3dc8d8"/>
                                        </a>
                                        <Link to={`/dashboard/employees/edit/${employee.userId}`}>
                                            <MdOutlineModeEdit fill="#00a762"/>
                                        </Link>
                                        {employee.enabled ?
                                            <a onClick={() => openDisableModal(employee)}>
                                                <MdCancel fill="red"/>
                                            </a>
                                            :
                                            <a onClick={() => openDeleteModal(employee)}>
                                                <IoTrashSharp fill="red"/>
                                            </a>
                                        }
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
                <UserDetailModal
                    isOpen={isModalOpen}
                    onClose={closeDetailModal}
                    id={userId}
                    onEnableSuccess={handleUpdateUserFlag}
                >
                </UserDetailModal>
                <DisableUserModal
                    isOpen={isModalDisableOpen}
                    onClose={closeDisableModal}
                    userDisable= {userDisable}
                    onDisableSuccess={handleUpdateUserFlag}
                >
                </DisableUserModal>
                <DeleteUserModal
                    isOpen={isModalDeleteOpen}
                    onClose={closeDeleteModal}
                    userDelete = {userDelete}
                    onDeleteSuccess={handleUpdateUserFlag}
                >
                </DeleteUserModal>
            </main>
        }/>
    );
}