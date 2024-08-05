import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "./assets/css/global.scss";
import {projectRouter} from "./routes/ProjectRouter";
import PrivateRoute from './utils/PrivateRoute';
import {useDispatch, useSelector} from "react-redux";
import {fetchCartFromServer, fetchCount} from "./core/redux/actions/CartActions";
import {useEffect} from "react";

function App() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchCartFromServer());
            dispatch(fetchCount());
        }
    }, [dispatch]);

  return (
      <Router>
          <Routes>
              {projectRouter.map((route, index) => {
                  if (route.private) {
                      return (
                          <Route
                              key={index}
                              path={route.path}
                              element={<PrivateRoute element={route.element}/>}
                          />
                      );
                  }

                  return (
                      <Route
                          key={index}
                          path={route.path}
                          element={route.element}
                      />
                  );
              })}
          </Routes>
      </Router>
  );
}

export default App;
