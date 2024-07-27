import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "./assets/css/global.scss";
import {projectRouter} from "./routes/ProjectRouter";
import PrivateRoute from './utils/PrivateRoute';

function App() {
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
