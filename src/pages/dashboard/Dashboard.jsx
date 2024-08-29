import React, {useEffect, useState} from "react";
import "./Dashboard.scss";
import * as dashboardService from "../../core/services/DashboardService";
import {fCurrency} from "../../utils/format-number";
import Moment from "moment";
import {BillModal} from "./BillModal/BillModal";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

export function Dashboard() {
    const [totalCustomers, setTotalCustomers] = useState(null);
    const [totalBills, setTotalBills] = useState(null);
    const [revenues, setRevenues] = useState(null);
    const [newBills, setNewBills] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [billId, setBillId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            await getTotalCustomers();
            await getTotalBills();
            await getRevenues(1);
            await getNewBills();
        }
        fetchData().then().catch();
    }, [])

    const getTotalCustomers = async () => {
        const temp = await dashboardService.getTotalCustomer();
        setTotalCustomers(temp);
    }

    const getTotalBills = async () => {
        const temp = await dashboardService.getTotalBills();
        setTotalBills(temp);
    }

    const getRevenues = async (option) => {
        const temp = await dashboardService.getRevenues(option);
        setRevenues(temp);
    }

    const getNewBills = async () => {
        try {
            const temp = await dashboardService.getNewBills();
            setNewBills(temp.content);
        }catch(error) {
            toast.error("Không tìm thấy đơn hàng!");
        }
    }

    const handleGetRevenues = async (option) => {
        const temp = await dashboardService.getRevenues(option);
        setRevenues(temp);
    }

    const handleGrowthPercent = (radius, value) => {
        const circumference = 2 * Math.PI * radius;
        if (value > 100) {
            value = 100;
        }
        return circumference - (value / 100) * circumference;
    }

    const totalCustomersGrowthOffset = totalCustomers ? handleGrowthPercent(36, totalCustomers.growth) : 0;
    const totalBillsGrowthOffset = totalBills ? handleGrowthPercent(36, totalBills.growth) : 0;
    const revenuesGrowthOffset = revenues ? handleGrowthPercent(36, revenues.growth) : 0;

    const handleOpenModal = (id) => {
        setBillId(id);
        setIsOpenModal(true);
    }

    const handleCloseModal = () => {
        setIsOpenModal(false);
    }
    return (
        <main id='dashboard'>
                <h1>Dashboard</h1>
                {/* Analyses */}
                <div className="analyse">
                    {revenues &&
                    <div className="sales growth">
                        <div className="status">
                            <div className="info">
                                <h3>Doanh thu</h3>
                                <h1>{fCurrency(revenues.totalRevenue)} VNĐ</h1>
                                <select onChange={(event) => handleGetRevenues(event.target.value)}>
                                        <option value={0}>Tuần này</option>
                                        <option value={1}>Tháng này</option>
                                        <option value={2}>Năm này</option>
                                </select>
                            </div>
                            <div className="progress">
                                <svg>
                                    <circle cx={55} cy={45} r={36} strokeDasharray={2 * Math.PI * 36} strokeDashoffset={revenuesGrowthOffset}/>
                                </svg>
                                <div className="percentage">
                                    <p>{revenues.growth > 0 ? `+ ${fCurrency(Math.round(revenues.growth))}%`
                                        : ` ${fCurrency(Math.round(revenues.growth))}%`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    }

                    { totalCustomers &&
                    <div className="visits growth">
                        <div className="status">
                            <div className="info">
                                <h3>Lượng khách</h3>
                                <h1>{totalCustomers.totalCustomers}</h1>
                            </div>
                            <div className="progress">
                                <svg>
                                    <circle cx={55} cy={45} r={36} strokeDasharray={2 * Math.PI * 36} strokeDashoffset={totalCustomersGrowthOffset}/>
                                </svg>
                                <div className="percentage">
                                    <p>{totalCustomers.growth > 0 ? `+ ${fCurrency(Math.round(totalCustomers.growth))}%`
                                        : ` ${fCurrency(Math.round(totalCustomers.growth))}%`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    }

                    { totalBills &&
                    <div className="searches growth">
                        <div className="status">
                            <div className="info">
                                <h3>Đơn hàng</h3>
                                <h1>{totalBills.totalBills}</h1>
                            </div>
                            <div className="progress">
                                <svg>
                                    <circle cx={55} cy={45} r={36} strokeDasharray={2 * Math.PI * 36}
                                            strokeDashoffset={totalBillsGrowthOffset}/>
                                </svg>
                                <div className="percentage">
                                <p>
                                        {totalBills.growth > 0 ? `Tăng ${Math.round(totalBills.growth)}%`
                                            : `Giảm ${Math.round(totalBills.growth)}%`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                </div>
                <div className="recent-orders">
                    <h2>Top 5 đơn hàng mới nhất</h2>
                    <div className="bill-content">
                        <ol className="styled-list">
                            {newBills && newBills?.map((item, index) => (
                                <li key={index} onClick={() => handleOpenModal(item.id)}>
                                    <span className="date">{Moment(item.dateCreate).format("DD/MM/yyyy")}</span>
                                    <span className="customer-name">{item.customerName}</span>
                                </li>
                            ))}
                        </ol>
                        <Link to='/dashboard/bills'>Show All</Link>
                    </div>
                </div>
                <BillModal
                    isOpen={isOpenModal}
                    onClose={handleCloseModal}
                    billId={billId}
                />
            </main>
    );
}