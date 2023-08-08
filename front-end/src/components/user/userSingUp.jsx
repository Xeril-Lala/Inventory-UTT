import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { C } from '../../constants/C.js';
import { downloadFile, formatDate, getUserGroup } from '../../constants/utils.js';
import AssetService from '../../services/Asset.js';
import UserService from '../../services/User.js';
import CustomTable from '../customTable/customTable.jsx';
import UserForm from './userForm.jsx';
import { FaDownload, FaFileExcel } from 'react-icons/fa';
import InputFiles from 'react-input-files';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/Context';

const UserSignUp = () => {
    const { group } = React.useContext(AuthContext);
    const userService = new UserService();
    const assetService = new AssetService();

    const [grants, setGrants] = useState(null);

    const [user, setUser] = useState(null);
    const [selectedGroup, setGroup] = useState(null);
    const [groups, setGroups] = useState([]);
    const [trigger, setTrigger] = useState(false);

    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let res = await assetService.getAssets({ group: 'USER_GROUP' });

            if(res?.status == C.status.common.ok){
                setGroups(
                    res.data.map(x => ({ value: x.code, label: `${x.value} - ${x.description}`, data: x })),
                    console.log(res.data),
                );
            }
        }
        
        setGrants(group());

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

            return filteredData.map(x => ({
                username: x.username,
                name: `${x.lastname} ${x.name}`,
                group: x?.group?.description?.length ? x?.group?.description[0] : 'NA',
                id: x?.contact?.id,
                email: x.contact?.email,
                modified: formatDate(x?.lastModified, false),
                audit: x?.auditUser
            }));
        } else return [];
    }

    const getUserInfo = async (row) => {
        var res = await userService.getUser(row.username);

        if(res?.status == C.status.common.ok){
            setUser(res.data);
        }

    };

    const selectGroup = (value) => {
        setGroup(value);
        setTrigger(val => !val);
    } 

    const onSelectExcel = async (files) => {

        if(files?.length > 0) {
            let file = files[0];

            toast.promise(userService.setUserExcel(file), {
                pending: 'Subiendo Excel...',
                success: 'Excel cargado exitosamente',
                error: 'Error Subiendo Excel - Favor de revisar el formato subido'
            });

            setTrigger(val => !val);
        }
    }

    const columns = [
        {
            name: "Usuario",
            // selector: row => row.username,
            selector: "username",
            // sortable: true,
        },
        {
            name: "Nombre",
            // selector: row => row.name,
            selector: "name",
            // sortable: true,
        },
        {
            name: "ID",
            // selector: row => row.id,
            selector: "id",
            // sortable: true,
        },
        {
            name: "Email",
            // selector: row => row.email,
            selector: "email",
            // sortable: true,
        },
        {
            name: "Rol",
            // selector: row => row.group,
            selector: "group",
            // sortable: true,
        },
        {
            name: "Modificado",
            // selector: row => row.modified,
            selector: "modified",
            // sortable: true,
        },
        {
            name: "Auditor",
            // selector: row => row.audit,
            selector: "audit",
            // sortable: true,
        },
    ];

    return (
        <div className="w-full mx-4 sm:mx-auto">
            {/* <div className="h-auto text-3xl mb-6">Formulario usuario</div> */}

            <div className="grid grid-cols-6 gap-4 rounded-md shadow-md bg-white p-2 my-2">
                <Select 
                    className="col-span-3" 
                    value={selectedGroup}
                    options={groups}
                    onChange={selectGroup}
                    isClearable
                    isSearchable
                    placeholder="Filtrar por Rol o Grupo"
                />

                <div className="flex col-span-2 col-start-5 flex-row-reverse mr-4">
                    { grants == C.roles.ADMIN &&
                        <>
                            <FaDownload onClick={() => downloadFile(C.media.userTemplate, `User-Inventory-Template.xlsx`)} className="text-2xl my-auto mr-2 cursor-pointer hover:text-blue-500" title="Descargar Excel" />
                            <div className="my-auto mt-2 mr-2 cursor-pointer">
                                <InputFiles accept=".xlsx" onChange={onSelectExcel} >
                                    <FaFileExcel className="text-2xl cursor-pointer hover:text-blue-500" title="Subir Excel" />
                                </InputFiles>
                            </div>
                        </>
                    }
                </div>
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