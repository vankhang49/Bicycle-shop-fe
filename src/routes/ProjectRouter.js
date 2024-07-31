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

export const projectRouter = [
    {
        path: '/Bicycle-shop-fe',
        element: <HomePage/>,
        exact: true,
    },
    {
        path: '/Bicycle-shop-fe/products',
        element: <AllProduct/>,
    },
    {
        path: '/Bicycle-shop-fe/products/:categoryName',
        element: <AllProduct/>,
    },
    {
        path: '/Bicycle-shop-fe/products/:categoryName/:familyName',
        element: <AllProduct/>,
    },
    {
        path: '/Bicycle-shop-fe/products/detail/:productId',
        element: <ProductDetail/>,
    },
    {
        path: '/Bicycle-shop-fe/products/create',
        element: <CreateProduct/>,
    },
    {
        path: '/Bicycle-shop-fe/about-us',
        element: <AboutUs/>,
    },
    {
        path: '/Bicycle-shop-fe/cart',
        element: <Cart/>,
    },
    {
        path: '/Bicycle-shop-fe/pay',
        element: <Pay/>,
    },
    {
        path: '/Bicycle-shop-fe/login',
        element: <Login/>,
    },
    {
        path: '/Bicycle-shop-fe/dashboard',
        element: <Dashboard/>,
    },
    {
        path: '/Bicycle-shop-fe/dashboard/products',
        element: <ProductList/>,
    },
    {
        path: '/Bicycle-shop-fe/dashboard/products/create',
        element: <CreateProduct/>,
    },
    {
        path: '/Bicycle-shop-fe/dashboard/products/create/:id',
        element: <CreateProduct/>,
    },
    {
        path: '/Bicycle-shop-fe/dashboard/customers',
        element: <Customer/>,
    },
    {
        path: '/Bicycle-shop-fe/dashboard/bills',
        element: <Bills/>,
    },
    {
      path: '/Bicycle-shop-fe/dashboard/setting',
      element: <Setting/>,
    },
    {
        path: '*',
        element: <NotFound/>,
    },
];