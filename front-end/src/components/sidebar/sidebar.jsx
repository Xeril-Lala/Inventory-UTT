import React, { Component } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses } from 'react-pro-sidebar';
import { ProSidebarProvider } from 'react-pro-sidebar';
import styled from 'styled-components';
import { Zap } from '@styled-icons/boxicons-solid/Zap';
const Sideb = () =>{




return (

    <Sidebar backgroundColor='#212121'>
       <Menu>
        <MenuItem prefix = "<Zap/>"> Resumen</MenuItem>
        <MenuItem>Prestamos</MenuItem>
        <MenuItem>Historial</MenuItem>
        <MenuItem>Inventario</MenuItem>
        <MenuItem>Resguardos</MenuItem>
      </Menu>
    </Sidebar>

);
};
export default Sideb;