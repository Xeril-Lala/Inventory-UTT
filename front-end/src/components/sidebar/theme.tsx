import react from 'react';
import React, { Component } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses } from 'react-pro-sidebar';
import { ProSidebarProvider } from 'react-pro-sidebar';
import styled from 'styled-components';
import { Dashboard } from '@styled-icons/material-rounded/Dashboard';
import { Calendar2PlusFill } from '@styled-icons/bootstrap/Calendar2PlusFill';
import { DocumentBulletListClock } from '@styled-icons/fluentui-system-filled/DocumentBulletListClock';
import { Box2Fill } from '@styled-icons/bootstrap/Box2Fill';
import { ClipboardTaskListLtr } from '@styled-icons/fluentui-system-filled/ClipboardTaskListLtr';


type Theme = 'light' | 'dark';

const themes = {
    light: {
      sidebar: {
        backgroundColor: '#ffffff',
        color: '#607489',
      },
      menu: {
        menuContent: '#fbfcfd',
        icon: '#0098e5',
        hover: {
          backgroundColor: '#c5e4ff',
          color: '#44596e',
        },
        disabled: {
          color: '#9fb6cf',
        },
      },
    },
    dark: {
      sidebar: {
        backgroundColor: '#0b2948',
        color: '#8ba1b7',
      },
      menu: {
        menuContent: '#082440',
        icon: '#59d0ff',
        hover: {
          backgroundColor: '#00458b',
          color: '#b6c8d9',
        },
        disabled: {
          color: '#3e5e7e',
        },
      },
    },
  };

export default themes