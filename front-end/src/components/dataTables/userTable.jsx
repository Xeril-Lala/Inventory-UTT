import React from 'react';
import UserRow from './userRow';


const UserTable = ({ data }) => {
    return (
        <table>
        <thead>
            <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Lastname</th>
            <th>Group</th>
            <th>Last Modified</th>
            <th>Active</th>
            </tr>
        </thead>
        <tbody>
            {data.map((user) => (
            <UserRow key={user.username} user={user} />
            ))}
        </tbody>
        </table>
    );
};

export default UserTable;
