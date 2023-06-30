import { react, useEffect, useState } from 'react';
import axios from 'axios';
import userSingUp from '../user/userSingUp.jsx';



export default function userList(){

const URL = "http://localhost:8080/api/";
const test = "Asset/fdUaTHTfgj";
const [ data, getData] = useState('');



useEffect(() => {
    testEndPoint();
},[]);  

const testEndPoint = () => {
    axios.get(`${URL}/Assets`)
    .then((response) => {
        const allData = response.data.data.group;
        getData(allData);
    })
    .catch (error => console.error(`Error: ${error}`));
}
    return (
        <userSingUp data={data}/>
    )
}