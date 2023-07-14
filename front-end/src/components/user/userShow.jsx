import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserContainer from '../dataTables/userContainer.jsx';

const UserShow = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/User');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>User Table</h1>
            <UserContainer />
        </div>
    );
};
export default UserShow;