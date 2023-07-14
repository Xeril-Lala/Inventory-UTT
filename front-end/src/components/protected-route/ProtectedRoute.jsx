import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/Context';
import SecurityService from '../../services/Security';
import { C } from '../../constants/C';

const ProtectedRoute = ({ children }) => {
    const { userInfo, updateUserInfo } = React.useContext(AuthContext);
    const securityService = new SecurityService()

    let user = typeof userInfo === 'function' ? userInfo() : null;
    
    if (!user?.token) {
        return <Navigate to="/login" replace />;
    }

    securityService.checkToken(user?.token, user?.refreshToken, res => {
        if(res?.status == C.status.common.ok) {
            updateUserInfo(res?.data);
        } else {
            return <Navigate to="/login" replace />;
        }
    });

    return ({...children});
};

export default ProtectedRoute;