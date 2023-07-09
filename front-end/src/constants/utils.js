// TODO: Add methods for set/get localStorage variables.
// TODO: Code/Decode from B64


export const LoginLocalStorage = () => {

    const setLogin = (user) => {
        localStorage.setItem('userInfo', JSON.stringify(user));
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
    }

    const getLogin = () => {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        return userInfo;
    };

    return { setLogin, getLogin, logout};
}

export const getAuthToken = () => {
    var {getLogin} = LoginLocalStorage();

    var user = getLogin();

    return user?.token ?? '';
}