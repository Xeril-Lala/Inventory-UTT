import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { C } from '../../constants/C.js';
import { formatDate } from '../../constants/utils.js';
import AssetService from '../../services/Asset.js';
import UserService from '../../services/User.js';
import '../customTable/customStyle.css';
import CustomTable from '../customTable/customTable.jsx';
import UserForm from './userForm.jsx';

const UserSignUp = () => {
    const userService = new UserService();
    const assetService = new AssetService();

    const [user, setUser] = useState(null);
    const [selectedGroup, setGroup] = useState(null);
    const [groups, setGroups] = useState([]);
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let res = await assetService.getAssets({ group: 'USER_GROUP' });

            if(res?.status == C.status.common.ok){
                setGroups(
                    res.data.map(x => ({ value: x.code, label: `${x.value} - ${x.description}`, data: x }))
                );
            }
        }

        fetchData();
    }, []);


    const convertData = response => {

        if(response?.status == C.status.common.ok) {
            let res = response?.data;
            let filteredData = res.filter(x => {
                let flag1 = x?.group?.group == 'USER_GROUP';
                let flag2 = !selectedGroup || x?.group?.code == selectedGroup?.value;
                
                return flag1 && flag2;
            });
            return filteredData.map(x => [
                x.username,
                `${x.lastname} ${x.name}`,
                x?.group?.description ?? 'NA',
                formatDate(x?.lastModified),
                x?.auditUser
            ]);
        } else return [];
    }

    const getUserInfo = async (row) => {
        console.log(row);

        var res = await userService.getUser(row[0]);

        if(res?.status == C.status.common.ok){
            setUser(res.data);
        }

    };

    const selectGroup = (value) => {
        setGroup(value);
        setTrigger(val => !val)
    } 

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
        {
            name: 'Modificado',
            selector: row => row[3],
            sortable: true,
        },
        {
            name: 'Auditor',
            selector: row => row[4],
            sortable: true,
        },
    ];

    return (
        <div className="w-full mx-4 sm:mx-auto">
            {/* <div className="h-auto text-3xl mb-6">Formulario usuario</div> */}

            <div className="grid grid-cols-6 ga rounded-md shadow-md bg-white p-2 my-2">
                <Select 
                    className="col-span-3" 
                    value={selectedGroup}
                    options={groups}
                    onChange={selectGroup}
                    isClearable
                    isSearchable
                    placeholder="Filtrar por Rol o Grupo"
                />
            </div>

            <div className="grid grid-cols-6 gap-4 md:auto-cols-min">
                <div className="col-span-4 rounded-md shadow-md bg-white p-6">
                    <CustomTable
                        title={'Lista Usuarios'}
                        columns={columns}
                        styles={C.styles.dataTable}
                        onSelectRow={getUserInfo}
                        onHook={async () => await userService.getUsers({ })}
                        convertData={convertData}
                        triggerRefresh={trigger}
                    />
                </div>

                <div className="col-span-2 rounded-md shadow-md bg-white p-6">
                    <div className="h-auto text-center text-xl">Usuario</div>

                    <UserForm 
                        user={user}
                        updateUserCallback={ user => {
                            setUser(user);
                            setTrigger(val => !val)
                        }}
                    />
                </div>

            </div>
        </div>
    );
};

export default UserSignUp;