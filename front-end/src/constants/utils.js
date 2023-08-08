// TODO: Add methods for set/get localStorage variables.
// TODO: Code/Decode from B64

import { C } from "./C";


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

    return { setLogin, getLogin, logout };
}

export const getUserGroup = (userInfo) => {
    if(userInfo) {
        return userInfo.user.group.code;
    } else {
        return "";
    }
}

export const getAuthToken = () => {
    var { getLogin } = LoginLocalStorage();

    var user = getLogin();

    return user?.token ?? '';
}

export const formatDate = (dateStr, fullDate = true) => {

    if (!dateStr) return '';

    let date = new Date(dateStr);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12; // Convert 0 to 12 for 12-hour clock
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return fullDate ? 
        `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}` : 
        `${day}/${month}/${year}`;
}

export const getBadgeClass = (status) => {
    switch(status) {
        case C.status.loan.PRESTADO: return "bg-blue-100 text-blue-800 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300";
        case C.status.loan.PERDIDO: return "bg-red-100 text-red-800 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300";
        case C.status.loan.TERMINADO: return "bg-green-100 text-green-800 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300";
        case C.status.loan.VENCIDO: return "bg-yellow-100 text-yellow-800 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300";
        case C.status.loan.RESGUARDO: return "bg-gray-100 text-gray-800 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300";
        default: return "bg-pink-100 text-pink-800 font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300";
    }
}

export const downloadFile = (href, fileName ) => 
{    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = href;
    
    // Set the download attribute to trigger the file download
    link.download = fileName;
    
    // Append the anchor element to the document body
    document.body.appendChild(link);
    
    // Click the link to initiate the download
    link.click();
    
    // Clean up by removing the temporary anchor element
    document.body.removeChild(link);
}

export const getFirstAndLastDayOfWeek = () => {
    const firstDay = new Date(Date.now());
    firstDay.setDate(firstDay.getDate() - firstDay.getDay());
  
    const lastDay = new Date(firstDay);
    lastDay.setDate(firstDay.getDate() + (6 - firstDay.getDay()));
  
    return { firstDay, lastDay };
}

export const getFirstAndLastDayOfMonth = () => {
    const currentDate = new Date(Date.now());
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
    return { firstDay, lastDay };
}