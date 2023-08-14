import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/Context';
import SecurityService from '../../services/Security';
import { C } from '../../constants/C';

const ProtectedRoute = ({ children, allowedRoles, roles }) => {
  const { userInfo, updateUserInfo, userRole } = React.useContext(AuthContext);
  const securityService = new SecurityService();

  const toLogin = () => <Navigate to="/login" replace />;
  const toUnauthorized = () => <Navigate to = "/unauthorized" replace />;

  let user = typeof userInfo === 'function' ? userInfo() : null;

  useEffect(() => {
    if (!user?.token) {
      return toLogin();
    }


    securityService.checkToken(user?.token, user?.refreshToken)
      .then(res => {
        if (res?.status === C.status.common.ok) {
          updateUserInfo(res?.data);
          if (!roles || roles.includes(userRole())) {
            return;
          } else {
            toUnauthorized();
          }
        } else {
          return toLogin();
        }
      })
      .catch(err => toLogin());
  }, [userInfo, updateUserInfo, user, roles, userRole]);

  // return {...children};
  //   securityService.checkToken(user?.token, user?.refreshToken)
  //     .then(res => {
  //       if (res?.status === C.status.common.ok) {
  //         updateUserInfo(res?.data);
  //       } else {
  //         return toLogin();
  //       }
  //     })
  //     .catch(err => toLogin());
  // }, [userInfo, updateUserInfo, user]);

  // const userRole = user?.role;

  // if (!allowedRoles.includes(userRole)){
  //   return<Navigate to="/unauthorized" replace />;
  // }

  return {...children};
};

export default ProtectedRoute;