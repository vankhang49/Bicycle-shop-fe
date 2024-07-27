import React from 'react';
import { Navigate } from 'react-router-dom';


export const isAuthenticated = () =>{
    const token = localStorage.getItem('token');
    return !!token
}

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;