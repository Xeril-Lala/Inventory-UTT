// Importar módulos y componentes necesarios desde bibliotecas y archivos locales
import { useNavigate } from "react-router-dom";
import { LoginLocalStorage, getUserGroup } from "../constants/utils"
import { AuthContext } from "../context/Context";

// Definir el componente proveedor de autenticación
export const AuthProvider = ({ children }) => {
    // Obtener la función de navegación de React Router
    const navigate = useNavigate();
    
    // Obtener funciones relacionadas con la autenticación desde el almacenamiento local
    let { setLogin, getLogin, logout } = LoginLocalStorage();

    // Definir el valor del contexto de autenticación
    const value = {
        // Obtener la información del usuario actualmente autenticado
        userInfo: () => getLogin(),

        // Establecer la información del usuario autenticado
        setUserInfo: info => {
            setLogin(info);
            navigate('/');
        },

        // Cerrar sesión del usuario
        logout: () => {
            try {
                logout();
                navigate('/login');
            } catch {
                navigate('/login');
            }
        },

        // Actualizar la información del usuario autenticado
        updateUserInfo: info => {
            setLogin(info);
        },

        // Obtener el grupo del usuario autenticado
        group: () => {
            try {
                return getUserGroup(getLogin());
            } catch {
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