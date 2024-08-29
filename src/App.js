import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "./assets/css/global.scss";
import {adminRouter, publicRouter} from "./routes/PublicRouter";
import PrivateRoute from './utils/PrivateRoute';
import {useDispatch, useSelector} from "react-redux";
import {fetchCartFromServer, fetchCount} from "./core/redux/actions/CartActions";
import {useEffect} from "react";
import {Main} from "./components/Main/Main";
import {DashboardMain} from "./components/DashboardMain/DashboardMain";
import {LoginForm} from "./pages/login/LoginForm";
import {RegisterForm} from "./pages/login/RegisterForm";
import NotFound from "./pages/ErrorPage/NotFound";
import {CheckEmail} from "./pages/login/ForgotPassword/CheckEmail";
import {ForgotPassword} from "./pages/login/ForgotPassword/ForgotPassword";

function App() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         dispatch(fetchCartFromServer());
    //         dispatch(fetchCount());
    //     }
    // }, [dispatch]);

  return (
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
              <Route path={"/login"} element={<LoginForm/>}/>
              <Route path={"/register"} element={<RegisterForm/>}/>
              <Route path={"/check-email"} element={<CheckEmail/>}/>
              <Route path={"/forgot-password"} element={<ForgotPassword/>}/>
              <Route path={"*"} element={<NotFound />}/>
          </Routes>
      </Router>
  );
}

export default App;
