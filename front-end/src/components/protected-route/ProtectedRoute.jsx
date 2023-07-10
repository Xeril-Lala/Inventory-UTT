import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/Context';

const ProtectedRoute = ({ children }) => {
    const { userInfo } = React.useContext(AuthContext);

    var user = typeof userInfo === 'function' ? userInfo() : null;

    // TODO: Add Token Validation method!!

    if (!user?.token) {
        return <Navigate to="/login" replace />;
    }

    return ({ ...children });
};

export default ProtectedRoute;