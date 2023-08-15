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


const Sidebar = ({ children }) => {
    const { logout, userInfo } = React.useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        setUser(userInfo());
    }, []);

    const menuItem = [
        {
            path: "/Utilidades",
            name: "Utilidades",
            icon: <FaTh />,
            //roles: ["DEV", "ADMIN"]
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

    return (
<div className="flex font-mono  overflow-auto h-[100vh]">
      <div
        style={{ maxWidth: isOpen ? '270px' : '70px' }}
        className="bg-zinc-900 h-[100vh] w-[270px] transition-all duration-500 "
      >
                <div className="flex items-center p-6">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="text-2xl text-white italic font-bold">UTT</h1>
                    <div style={{ marginLeft: isOpen ? "125px" : "0px" }} className="flex text-xl text-white ">
                        <FaBars onClick={toggle} />
                    </div>
                </div>

                <h1 style={{ display: isOpen ? "block" : "none" }} className="text-sm text-center text-white italic font-bold"> Hola, {user?.user?.name} {user?.user?.lastname}  </h1>
                
                {
                    menuItem
                    .filter(item => !item.roles || item.roles.includes(user?.user?.group?.code))
                    .map((item, index) => (
                        <NavLink
                            to={item.path}
                            key={index}
                            className="flex text-white px-6 py-4 gap-3 transition-all duration-500 hover:bg-blue-300"
                            activeClassName="bg-blue-300 text-black"
                        >
                            <div className="text-md p-1">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="text-md">
                                {item.name}
                            </div>
                        </NavLink>
                    ))
                }
                <NavLink
                    onClick={logout}
                    to="/login"
                    key={100}
                    className="flex text-white px-6 py-4 gap-3 transition-all duration-500 hover:bg-blue-300"
                >
                    <div className="text-md p-1">
                        <FaSignOutAlt />
                    </div>
                    <div style={{ display: isOpen ? "block" : "none" }} className="text-md">
                        Cerrar Sesión
                    </div>
                </NavLink>
            </div>
            <main className="w-full p-6 sm:p-4 bg-blue-50">{children}</main>
        </div>
    );
};

export default Sidebar;