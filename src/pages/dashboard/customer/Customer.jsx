import {DashboardMain} from "../../../components/DashboardMain/DashboardMain";
import {TiArrowUnsorted} from "react-icons/ti";
import {BiSolidShow} from "react-icons/bi";
import {MdOutlineModeEdit} from "react-icons/md";
import {IoTrashSharp} from "react-icons/io5";
import "./Customer.scss";

export function Customer() {

    return(
        <DashboardMain content={
            <main id='customer'>
                <div className="content-element">
                    <div className="header-content">
                        <form className="form-search">
                            <input type="text" className="search-bar"
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
                            <tr>
                                <td className={"no"}>1</td>
                                <td className={"customer-code"}>KH0001</td>
                                <td className={"customer-name"}>Nguyễn Văn A</td>
                                <td className={"gender"}>Nam</td>
                                <td className={"email"}>nva@gmail.com</td>
                                <td className={"phone-number"}>0123456789</td>
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
                            <tr>
                                <td className={"no"}>1</td>
                                <td className={"customer-code"}>KH0001</td>
                                <td className={"customer-name"}>Nguyễn Văn A</td>
                                <td className={"gender"}>Nam</td>
                                <td className={"email"}>nva@gmail.com</td>
                                <td className={"phone-number"}>0123456789</td>
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
                            <tr>
                                <td className={"no"}>1</td>
                                <td className={"customer-code"}>KH0001</td>
                                <td className={"customer-name"}>Nguyễn Văn A</td>
                                <td className={"gender"}>Nam</td>
                                <td className={"email"}>nva@gmail.com</td>
                                <td className={"phone-number"}>0123456789</td>
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
                            <tr>
                                <td className={"no"}>1</td>
                                <td className={"customer-code"}>KH0001</td>
                                <td className={"customer-name"}>Nguyễn Văn A</td>
                                <td className={"gender"}>Nam</td>
                                <td className={"email"}>nva@gmail.com</td>
                                <td className={"phone-number"}>0123456789</td>
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
                            <tr>
                                <td className={"no"}>1</td>
                                <td className={"customer-code"}>KH0001</td>
                                <td className={"customer-name"}>Nguyễn Văn A</td>
                                <td className={"gender"}>Nam</td>
                                <td className={"email"}>nva@gmail.com</td>
                                <td className={"phone-number"}>0123456789</td>
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
                            <tr>
                                <td className={"no"}>1</td>
                                <td className={"customer-code"}>KH0001</td>
                                <td className={"customer-name"}>Nguyễn Văn A</td>
                                <td className={"gender"}>Nam</td>
                                <td className={"email"}>nva@gmail.com</td>
                                <td className={"phone-number"}>0123456789</td>
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
                            </tbody>
                        </table>
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
            </main>
        }/>
    );
}