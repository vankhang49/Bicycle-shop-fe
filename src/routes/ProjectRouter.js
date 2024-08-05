import {HomePage} from "../pages/homePage/HomePage";
import {AboutUs} from "../pages/aboutUs/AboutUs";
import {Cart} from "../pages/cart/Cart";
import {Login} from "../pages/login/Login";
// import {CreateProduct} from "../pages/createProduct/CreateProduct";
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

export const projectRouter = [
    {
        path: '',
        element: <HomePage/>,
        exact: true,
    },
    {
        path: '/products',
        element: <AllProduct/>,
    },
    {
        path: '/products/:categoryName',
        element: <AllProduct/>,
    },
    {
        path: '/products/:categoryName/:familyName',
        element: <AllProduct/>,
    },
    {
        path: '/products/detail/:productId',
        element: <ProductDetail/>,
    },
    {
        path: '/products/create',
        element: <CreateProduct/>,
    },
    {
        path: '/about-us',
        element: <AboutUs/>,
    },
    {
        path: '/my-info',
        element: <UserInfo/>,
    },
    {
        path: '/my-info/bill',
        element: <UserBill/>,
    },
    {
        path: '/cart',
        element: <Cart/>,
    },
    {
        path: '/pay',
        element: <Pay/>,
    },
    {
        path: '/login',
        element: <Login/>,
    },
    {
        path: '/dashboard',
        element: <Dashboard/>,
    },
    {
        path: '/dashboard/products',
        element: <ProductList/>,
    },
    {
        path: '/dashboard/products/create',
        element: <CreateProduct/>,
    },
    {
        path: '/dashboard/products/create/:id',
        element: <CreateProduct/>,
    },
    {
        path: '/dashboard/employees',
        element: <EmployeeList/>,
    },
    {
        path: '/dashboard/employees/create',
        element: <EmployeeCreate/>,
    },
    {
        path: '/dashboard/employees/edit/:id',
        element: <EmployeeCreate/>,
    },
    {
        path: '/dashboard/customers',
        element: <Customer/>,
    },
    {
        path: '/dashboard/advertisements',
        element: <Advertisements/>,
    },
    {
        path: '/dashboard/bills',
        element: <Bills/>,
    },
    {
      path: '/dashboard/setting',
      element: <Setting/>,
    },
    {
        path: '*',
        element: <NotFound/>,
    },
];