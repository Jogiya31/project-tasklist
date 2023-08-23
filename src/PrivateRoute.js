import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const isLoggedIn = sessionStorage.getItem('loggedIn');
    if (isLoggedIn==='true') {
        return children;
    } else {
        return <Navigate to="/" />;
    } 
}

export default PrivateRoute;