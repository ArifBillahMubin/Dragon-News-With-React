import React, { use } from 'react';
import { AuthContext } from './authProvider';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const location = useLocation();
    // console.log(location);

    if (loading) {
        return <span className="loading loading-ring loading-xl"></span>
    }

    if (user && user?.email) {
        return children;
    } else {
        return <Navigate state={location.pathname} to={'/auth/login'}></Navigate>
    }

};

export default PrivateRoute;