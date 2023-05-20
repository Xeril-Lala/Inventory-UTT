import React, { Component } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses } from 'react-pro-sidebar';
import { ProSidebarProvider } from 'react-pro-sidebar';
import styled from 'styled-components';
import { Dashboard } from '@styled-icons/material-rounded/Dashboard';
import { Calendar2PlusFill } from '@styled-icons/bootstrap/Calendar2PlusFill';
import { DocumentBulletListClock } from '@styled-icons/fluentui-system-filled/DocumentBulletListClock';
import { Box2Fill } from '@styled-icons/bootstrap/Box2Fill';
import { ClipboardTaskListLtr } from '@styled-icons/fluentui-system-filled/ClipboardTaskListLtr';
import './sidebar.css';





const Sideb = () =>{




return (
    <div class = "sidebarMain">
        <Sidebar backgroundColor='#212121'>
         <div class="logo"> UTT </div>
         <div class="subLogo"> Inventario </div>
        <Menu>
            <MenuItem icon = { <Dashboard/> }> Resumen</MenuItem>
            <MenuItem icon = { <Calendar2PlusFill/> }>Prestamos</MenuItem>
            <MenuItem icon = { <DocumentBulletListClock/> }>Historial</MenuItem>
            <MenuItem icon = { <Box2Fill/> }>Inventario</MenuItem>
            <MenuItem icon = { <ClipboardTaskListLtr/> }>Resguardos</MenuItem>
        </Menu>
        </Sidebar>
    </div>
);
};
export default Sideb;