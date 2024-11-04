import React from "react";
const HomePage = React.lazy(()=> import("../pages/homePage/HomePage"));
const AboutUs = React.lazy(()=> import("../pages/aboutUs/AboutUs"));
const Cart = React.lazy(()=> import("../pages/cart/Cart"));
const ProductDetail = React.lazy(()=> import("../pages/detail/ProductDetail"));
const Pay = React.lazy(()=> import("../pages/pay/Pay"));
const AllProduct = React.lazy(()=> import("../pages/allProduct/AllProduct"));
const Dashboard = React.lazy(()=> import("../pages/dashboard/Dashboard"));
const ProductList = React.lazy(()=> import("../pages/dashboard/Product/ProductList"));
const CreateProduct = React.lazy(()=> import("../pages/dashboard/Product/CreateProduct"));
const Customer = React.lazy(()=> import("../pages/dashboard/customer/Customer"));
const Setting = React.lazy(()=> import("../pages/dashboard/Setting/Setting"));
const Bills = React.lazy(()=> import("../pages/dashboard/Bill/Bills"));
const UserInfo = React.lazy(()=> import("../pages/UserInfo/UserInfo"));
const UserBill = React.lazy(()=> import("../pages/UserInfo/UserBill/UserBill"));
const EmployeeList = React.lazy(()=> import("../pages/dashboard/Employee/EmployeeList"));
const EmployeeCreate = React.lazy(()=> import("../pages/dashboard/Employee/EmployeeCreate"));
const Advertisements = React.lazy(()=> import("../pages/dashboard/Advertisements/Advertisement"));
const AccountAndPassword = React.lazy(()=> import("../pages/UserInfo/AccountAndPassword"));

export const publicRouter = [
    {
        path: '',
        component: <HomePage/>,
        exact: true,
    },
    {
        path: '/products',
        component: <AllProduct/>,
    },
    {
        path: '/products/:categoryName/:familyName',
        component: <AllProduct/>,
    },
    {
        path: '/products/:categoryName',
        component: <AllProduct/>,
    },
    {
        path: '/products/detail/:productId',
        component: <ProductDetail/>,
    },
    {
        path: '/about-us',
        component: <AboutUs/>,
    },
    {
        path: '/my-info',
        component: <UserInfo/>,
        private: true,
    },
    {
        path: '/my-info/bill',
        component: <UserBill/>,
        private: true,
    },
    {
        path: '/account-and-password',
        component: <AccountAndPassword/>,
        private: true,
    },
    {
        path: '/cart',
        component: <Cart/>,
    },
    {
        path: '/pay',
        component: <Pay/>,
    }
];

export const adminRouter = [
    {
        path: '/dashboard',
        component: <Dashboard/>,
        private: true,
    },
    {
        path: '/dashboard/products',
        component: <ProductList/>,
        private: true,
    },
    {
        path: '/dashboard/products/create',
        component: <CreateProduct/>,
        private: true,
    },
    {
        path: '/dashboard/products/create/:id',
        component: <CreateProduct/>,
        private: true,
    },
    {
        path: '/dashboard/employees',
        component: <EmployeeList/>,
        private: true,
    },
    {
        path: '/dashboard/employees/create',
        component: <EmployeeCreate/>,
        private: true,
    },
    {
        path: '/dashboard/employees/edit/:id',
        component: <EmployeeCreate/>,
        private: true,
    },
    {
        path: '/dashboard/customers',
        component: <Customer/>,
        private: true,
    },
    {
        path: '/dashboard/advertisements',
        component: <Advertisements/>,
        private: true,
    },
    {
        path: '/dashboard/bills',
        component: <Bills/>,
        private: true,
    },
    {
        path: '/dashboard/setting',
        component: <Setting/>,
        private: true,
    },
];
