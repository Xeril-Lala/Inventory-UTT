import React from 'react';

const UserRow = ({ user }) => {
    return (
        <tr>
        <td>{user.username}</td>
        <td>{user.name}</td>
        <td>{user.lastname}</td>
        <td>{user.group.value}</td>
        <td>{user.lastModified}</td>
        <td>{user.isActive ? 'Yes' : 'No'}</td>
        </tr>
    );
};

export default UserRow;
