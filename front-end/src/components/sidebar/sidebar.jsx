import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaThList,
    FaSignOutAlt
}from "react-icons/fa";
import './sidebar.css';
import { NavLink} from 'react-router-dom';
import { AuthContext } from '../../context/Context';


const Sidebar = ({children}) => {
    const { logout } = React.useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/inventory",
            name:"Inventario",
            icon:<FaTh/>
        },
        // {
        //     path:"/",
        //     name:"Prestamos Activos",
        //     icon:<FaThList/>
        // },
        {
            path:"/historical",
            name:"Historial",
            icon:<FaRegChartBar/>
        },
        {
            path:"/loanform",
            name:"Prestamos",
            icon:<FaCommentAlt/>
        },
        // {
        //     path:"/equipment",
        //     name:"Alta Equipos",
        //     icon:<FaCommentAlt/>
        // },
        {
            path:"/userSingUp",
            name:"Alta Usuarios",
            icon:<FaUserAlt/>
        },
        {
            path:"/user",
            name:"usuario",
            icon:<FaUserAlt/>
        },
        
    ]
    return (
        <div className="flex font-mono ">
           <div style={{width: isOpen ? "270px" : "70px"}} className="bg-zinc-900 h-[100vh] w-[270px] transition-all duration-500">
               <div className="flex items-center p-6">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="text-2xl text-white italic font-bold">UTT</h1>
                   <div style={{marginLeft: isOpen ? "125px" : "0px"}} className="flex text-xl text-white ">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
                {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="flex text-white px-6 py-4 gap-3 transition-all duration-500 hover:bg-blue-300 " activeclassName="bg-blue-300 text-black">
                           <div className="text-md p-1">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="text-md ">{item.name}</div>
                       </NavLink>
                   ))
                }
                <NavLink onClick={logout} to={'/login'} key={100} className="flex text-white px-6 py-4 gap-3 transition-all duration-500 hover:bg-blue-300" >
                    <div className="text-md p-1">
                        <FaSignOutAlt/>
                    </div>
                    <div style={{display: isOpen ? "block" : "none"}} className="text-md">Cerrar Sesión</div>
                </NavLink>
           </div>
           <main className="w-full p-6 sm:p-4 bg-blue-50">{children}</main>
        </div>
    );
};

export default Sidebar;