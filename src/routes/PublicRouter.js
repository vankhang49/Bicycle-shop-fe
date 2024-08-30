import {HomePage} from "../pages/homePage/HomePage";
import {AboutUs} from "../pages/aboutUs/AboutUs";
import {Cart} from "../pages/cart/Cart";
import {ProductDetail} from "../pages/detail/ProductDetail";
import {Pay} from "../pages/pay/Pay";
import {AllProduct} from "../pages/allProduct/AllProduct";
import {Dashboard} from "../pages/dashboard/Dashboard";
import NotFound from "../pages/ErrorPage/NotFound";
import {ProductList} from "../pages/dashboard/Product/ProductList";
import {Customer} from "../pages/dashboard/customer/Customer";
import {CreateProduct} from "../pages/dashboard/Product/CreateProduct";
import {Setting} from "../pages/dashboard/Setting/Setting";
import {Bills} from "../pages/dashboard/Bill/Bills";
import {UserInfo} from "../pages/UserInfo/UserInfo";
import {UserBill} from "../pages/UserInfo/UserBill/UserBill";
import {EmployeeList} from "../pages/dashboard/Employee/EmployeeList";
import {EmployeeCreate} from "../pages/dashboard/Employee/EmployeeCreate";
import {Advertisements} from "../pages/dashboard/Advertisements/Advertisement";
import {LoginForm} from "../pages/login/LoginForm";
import {RegisterForm} from "../pages/login/RegisterForm";
import {AccountAndPassword} from "../pages/UserInfo/AccountAndPassword";
import {ForgotPassword} from "../pages/login/ForgotPassword/ForgotPassword";
import {CheckEmail} from "../pages/login/ForgotPassword/CheckEmail";

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
