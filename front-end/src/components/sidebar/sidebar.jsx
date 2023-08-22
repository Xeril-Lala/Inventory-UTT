import React, { useState, useEffect } from 'react';
import {
    FaBars,
    FaCommentAlt,
    FaList,
    FaRegChartBar,
    FaSignOutAlt,
    FaTh,
    FaUserAlt,
    FaFileSignature,

} from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/Context';
import './sidebar.css';


// Definir el componente funcional para la barra lateral
const Sidebar = ({ children }) => {
    // Obtener funciones y datos del contexto de autenticación
    const { logout, userInfo } = React.useContext(AuthContext);
    
    // Estados para controlar el estado de la barra lateral y la información del usuario
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    
    // Función para alternar el estado de la barra lateral
    const toggle = () => setIsOpen(!isOpen);

    // Efecto de carga inicial para obtener la información del usuario
    useEffect(() => {
        setUser(userInfo());
    }, []);

    // Definir los elementos de menú con sus propiedades
    const menuItem = [
        {
            path: "/Utilidades",
            name: "Utilidades",
            icon: <FaTh />,
            //roles: ["DEV", "ADMIN"] añade los que quieras que puedan ver la pagina
        },
        // {
        //     path: "/historical",
        //     name: "Historial",
        //     icon: <FaRegChartBar />
        // },
        {
            path: "/form",
            name: "Préstamos",
            icon: <FaFileSignature />,
            //roles: ["DEV", "ADMIN", "LAB_ADMIN"]
        },
        {
            path: "/loan-history",
            name: "Préstamo Historial",
            icon: <FaList />
        },
        {
            path: "/userSingUp",
            name: "Alta Usuarios",
            icon: <FaUserAlt />,
            //roles: ["DEV", "ADMIN", "LAB_ADMIN"]
        },
        {
            path: "/inventory",
            name: "Inventario",
            icon: <FaComputer />
        }
    ];

// Renderizar el componente
return (
    <div className="flex font-mono  overflow-auto h-[100vh]">
        {/* Barra lateral */}
        <div
            style={{ maxWidth: isOpen ? '270px' : '70px' }}
            className="bg-zinc-900 h-[100vh] w-[270px] transition-all duration-500 "
        >
            {/* Encabezado de la barra lateral */}
            <div className="flex items-center p-6">
                {/* Mostrar el nombre de la aplicación (UTT) cuando la barra lateral está abierta */}
                <h1 style={{ display: isOpen ? "block" : "none" }} className="text-2xl text-white italic font-bold">UTT</h1>
                {/* Mostrar el icono de menú (FaBars) y alternar la barra lateral al hacer clic */}
                <div style={{ marginLeft: isOpen ? "125px" : "0px" }} className="flex text-xl text-white ">
                    <FaBars onClick={toggle} />
                </div>
            </div>

            {/* Saludo y nombre del usuario */}
            <h1 style={{ display: isOpen ? "block" : "none" }} className="text-sm text-center text-white italic font-bold"> Hola, {user?.user?.name} {user?.user?.lastname}  </h1>
            
            {/* Elementos de menú */}
            {
                // Filtrar y mapear los elementos del menú
                menuItem
                .filter(item => !item.roles || item.roles.includes(user?.user?.group?.code))
                .map((item, index) => (
                    // Crear un enlace de navegación (NavLink) para cada elemento del menú
                    <NavLink
                        to={item.path}
                        key={index}
                        className="flex text-white px-6 py-4 gap-3 transition-all duration-500 hover:bg-blue-300"
                        activeClassName="bg-blue-300 text-black"
                    >
                        {/* Mostrar el icono del elemento del menú */}
                        <div className="text-md p-1">{item.icon}</div>
                        {/* Mostrar el nombre del elemento del menú cuando la barra lateral está abierta */}
                        <div style={{ display: isOpen ? "block" : "none" }} className="text-md">
                            {item.name}
                        </div>
                    </NavLink>
                ))
            }
            {/* Elemento de cierre de sesión */}
            <NavLink
                onClick={logout}
                to="/login"
                key={100}
                className="flex text-white px-6 py-4 gap-3 transition-all duration-500 hover:bg-blue-300"
            >
                {/* Mostrar el icono de cierre de sesión (FaSignOutAlt) */}
                <div className="text-md p-1">
                    <FaSignOutAlt />
                </div>
                {/* Mostrar "Cerrar Sesión" cuando la barra lateral está abierta */}
                <div style={{ display: isOpen ? "block" : "none" }} className="text-md">
                    Cerrar Sesión
                </div>
            </NavLink>
        </div>

        {/* Contenido principal */}
        <main className="w-full p-6 sm:p-4 bg-blue-50">{children}</main>
    </div>
);

};

export default Sidebar;