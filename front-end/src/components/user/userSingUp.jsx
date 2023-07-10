import React, { useState } from 'react';
import UserForm from './userForm.jsx';
import UserService from '../../services/User.js';
import { C } from '../../constants/C.js';
import CustomTable from '../customTable/customTable.jsx';
import '../customTable/customStyle.css';

const UserSignUp = () => {
    const userService = new UserService();
    const [user, setUser] = useState(null);

    const convertData = response => {
        return response?.data.map(x => [
            x.username,
            `${x.lastname} ${x.name}`,
            x?.group?.value ?? 'NA'
        ]);
    }

    const getUserInfo = async (row) => {
        console.log(row);

        var res = await userService.getUser(row[0]);

        if(res?.status == C.status.common.ok){
            setUser(res.data);
        }

    };

    const columns = [
        {
            name: 'Usuario',
            selector: row => row[0],
            sortable: true,
        },
        {
            name: 'Nombre',
            selector: row => row[1],
            sortable: true,
        },
        {
            name: 'Rol',
            selector: row => row[2],
            sortable: true,
        },
    ];

    return (
        <div className="mx-4 sm:mx-auto h-auto">
            <div className="h-auto text-3xl mb-6">Formulario usuario</div>

            <div className="grid grid-cols-6 gap-4 md:auto-cols-min">
                <div className="col-span-4 rounded-md shadow-md bg-white p-6">
                    <CustomTable
                        title={'Lista Usuarios'}
                        columns={columns}
                        styles={C.styles.dataTable}
                        onSelectRow={getUserInfo}
                        onHook={async () => await userService.getUsers({})}
                        convertData={convertData}
                    />
                </div>

                <div className="col-span-2 rounded-md shadow-md bg-white p-6">
                    <div className="h-auto text-center text-xl">Usuario</div>

                    <UserForm 
                        user={user}
                        updateUserCallback={ user => {
                            
                            setUser(user);
                        }}
                    />
                </div>

            </div>
        </div>
    );
};

export default UserSignUp;