import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "./assets/css/global.scss";
import {adminRouter, publicRouter} from "./routes/PublicRouter";
import PrivateRoute from './utils/PrivateRoute';
import {Main} from "./components/Main/Main";
import {DashboardMain} from "./components/DashboardMain/DashboardMain";
import {ModalPicturesProvider} from "./core/contexts/ModalPicturesContext";
import {Suspense} from "react";
import Loading from "./components/Loading/Loading";

const NotFound = React.lazy(() => import("./pages/ErrorPage/NotFound"));
const CheckEmail = React.lazy(() => import("./pages/login/ForgotPassword/CheckEmail"));
const ForgotPassword = React.lazy(() => import("./pages/login/ForgotPassword/ForgotPassword"));
const TestLogin = React.lazy(() => import("./pages/login/TestLogin"));

function App() {

    return (
        <ModalPicturesProvider>
            <Suspense fallback={<Loading/>}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Main/>}>
                            {publicRouter.map((route, index) => {
                                if (route.private) {
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={<PrivateRoute element={route.component}/>}
                                        />
                                    );
                                }

                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={route.component}
                                    />
                                );
                            })}
                        </Route>
                        <Route path="/dashboard" element={<DashboardMain/>}>
                            {adminRouter.map((route, index) => {
                                if (route.private) {
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={<PrivateRoute element={route.component}/>}
                                        />
                                    );
                                }

                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={route.component}
                                    />
                                );
                            })}
                        </Route>
                        <Route path={"/login"} element={<TestLogin/>}/>
                        <Route path={"/register"} element={<TestLogin/>}/>
                        <Route path={"/check-email"} element={<CheckEmail/>}/>
                        <Route path={"/forgot-password"} element={<ForgotPassword/>}/>
                        <Route path={"*"} element={<NotFound/>}/>
                    </Routes>
                </Router>
            </Suspense>
        </ModalPicturesProvider>
    );
}

export default App;
