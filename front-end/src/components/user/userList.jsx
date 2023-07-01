import React, { useEffect, useState } from 'react';
import UserSingUp from '../user/userSingUp.jsx';
import DataTable from 'react-data-table-component';
import axios from 'axios';

    
    

const UserList = () => {
    const [user, getUsers] = useState('');
    const url = 'https://jsonplaceholder.typicode.com/';
    
    useEffect(() =>{
        getAllUsers();
    }, []);

    const getAllUsers = () => {
        axios.get(`${url}users`)
        .then((response) => {
            const allUsers = response.data.name;
            getUsers(allUsers);
        })
        .catch(error => console.error(`Error: ${error}`));
    }

return (
    
    <UserSingUp data={user}/>
)
}

export default UserList;