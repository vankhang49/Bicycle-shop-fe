import {TiArrowUnsorted} from "react-icons/ti";
import {BiSolidShow} from "react-icons/bi";
import {MdOutlineModeEdit} from "react-icons/md";
import {IoTrashSharp} from "react-icons/io5";
import {DashboardMain} from "../../../components/DashboardMain/DashboardMain";
import "./Bill.scss";

export function Bills() {

    return(
        <DashboardMain content={
            <main id='bill'>
                <div className="content-element">
                    <div className="header-content">
                        <form className="form-search">
                            <input type="text" className="search-bar"
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
                                    <button className="sort-button">
                                        <TiArrowUnsorted/>
                                    </button>
                                </th>
                                <th className={"customer"}>
                                    <span>Khách hàng</span>
                                    <button className="sort-button">
                                        <TiArrowUnsorted/>
                                    </button>
                                </th>
                                <th className={"date-create"}>
                                    <span>Ngày</span>
                                    <button className="sort-button">
                                        <TiArrowUnsorted/>
                                    </button>
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
                            <tr>
                                <td className={"no"}>1</td>
                                <td className={"bill-code"}>KH0001</td>
                                <td className={"customer"}>Nguyễn Văn A</td>
                                <td className={"date-create"}>01/01/0101</td>
                                <td className={"phone-number"}>0123456789</td>
                                <td className={"status done"}>Đã giao hàng</td>
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
                                <td className={"bill-code"}>KH0001</td>
                                <td className={"customer"}>Nguyễn Văn A</td>
                                <td className={"date-create"}>01/01/0101</td>
                                <td className={"phone-number"}>0123456789</td>
                                <td className={"status"}>Đang giao</td>
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
                                <td className={"bill-code"}>KH0001</td>
                                <td className={"customer"}>Nguyễn Văn A</td>
                                <td className={"date-create"}>01/01/0101</td>
                                <td className={"phone-number"}>0123456789</td>
                                <td className={"status done"}>Đã giao hàng</td>
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
                                <td className={"bill-code"}>KH0001</td>
                                <td className={"customer"}>Nguyễn Văn A</td>
                                <td className={"date-create"}>01/01/0101</td>
                                <td className={"phone-number"}>0123456789</td>
                                <td className={"status"}>Đang giao</td>
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
                                <td className={"bill-code"}>KH0001</td>
                                <td className={"customer"}>Nguyễn Văn A</td>
                                <td className={"date-create"}>01/01/0101</td>
                                <td className={"phone-number"}>0123456789</td>
                                <td className={"status done"}>Đã giao hàng</td>
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
                                <td className={"bill-code"}>KH0001</td>
                                <td className={"customer"}>Nguyễn Văn A</td>
                                <td className={"date-create"}>01/01/0101</td>
                                <td className={"phone-number"}>0123456789</td>
                                <td className={"status"}>Đang giao</td>
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