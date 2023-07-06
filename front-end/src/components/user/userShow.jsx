import React from 'react';
import UserTable from '../dataTables/userTable.jsx';

const UserShow = () => {
    const columns = [
        { header: 'Nombre', field: 'name' },
        { header: 'Edad', field: 'age' },
        { header: 'Email', field: 'email' },
    ];

    const data = [
        { name: 'John Doe', age: 30, email: 'johndoe@example.com' },
        { name: 'Jane Smith', age: 25, email: 'janesmith@example.com' },
        // Otros datos...
    ];

    return (
        <div>
        <h1>Tabla de Datos</h1>
        <UserTable columns={columns} data={data} />
        </div>
    );
};

export default UserShow;
