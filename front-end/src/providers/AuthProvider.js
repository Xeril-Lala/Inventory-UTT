import { useNavigate } from "react-router-dom";
import { LoginLocalStorage } from "../constants/utils"
import { AuthContext } from "../context/Context";

export const AuthProvider = ( {children} ) => {
    const navigate = useNavigate();
    let {setLogin, getLogin, logout} = LoginLocalStorage();

    const value = {
        userInfo: () => getLogin(),
        setUserInfo: info => {
            setLogin(info);
            navigate('/');
        },
        logout: () => {
            logout();
            navigate('/login');
        },
        updateUserInfo: info => {
            setLogin(info);
        }
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}