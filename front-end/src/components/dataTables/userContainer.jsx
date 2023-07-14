import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from './userTable.jsx';

const UserContainer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/User/DEV');
        setData(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return <UserTable data={data} />;
};

export default UserContainer;
