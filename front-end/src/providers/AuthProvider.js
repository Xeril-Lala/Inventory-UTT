import { useNavigate } from "react-router-dom";
import { LoginLocalStorage, getUserGroup } from "../constants/utils"
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
            try {
                logout();
                navigate('/login');
            } catch {
                navigate('/login');
            }
        },
        updateUserInfo: info => {
            setLogin(info);
        },
        group: () => {
            try {
                return getUserGroup(getLogin())
            }catch {
                return "";
            }
        }
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}