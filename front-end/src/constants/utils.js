// TODO: Add methods for set/get localStorage variables.
// TODO: Code/Decode from B64

import { useState } from "react";

export const LoginLocalStorage = () => {
    const [userInfo, setUserInfo] = useState(null);

    const setLogin = (user) => {
        localStorage.setItem('userInfo', JSON.stringify(user));
        setUserInfo(user);
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUserInfo(null);
    }

    const getLogin = () => {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUserInfo(userInfo);
        return userInfo;
    };

    return { setLogin, getLogin, logout, userInfo};    
}

export const getAuthToken = () => {
    var {getLogin} = LoginLocalStorage()

    var user = getLogin();

    return user?.token ?? '';
}