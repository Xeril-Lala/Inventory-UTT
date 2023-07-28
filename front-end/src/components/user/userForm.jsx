import { sha256 } from 'js-sha256';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaSave } from 'react-icons/fa';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { C } from '../../constants/C';
import AssetService from '../../services/Asset';
import UserService from '../../services/User';

// Definición del componente AssetForm
const AssetForm = ({ user, updateUserCallback = () => {} }) => {
    const userService = new UserService(); // Instancia el servicio UserService
    const assetService = new AssetService(); // Instancia el servicio AssetService
    
    // Declaración de los estados utilizando el hook useState
    const [groups, setGroups] = useState([]); // Estado para almacenar los grupos
    const [group, setGroup] = useState(null); // Estado para almacenar el grupo seleccionado
    const [isEditable, setEditable] = useState(false); // Estado para controlar si el formulario es editable o no
    const [userData, setUserData] = useState({ // Estado para almacenar los datos del usuario
        username: '',
        name: '',
        lastname: '',
        id: '',
        email: '',
        password: ''
    });

    // Efecto que se ejecuta cuando cambia el usuario
    useEffect(() => {
        if (user) {
            // Actualiza el estado de los datos del usuario basado en la información del usuario prop
            setUserData({
                username: user?.username || '',
                name: user?.name || '',
                lastname: user?.lastname || '',
                id: user?.contact?.id || '',
                email: user?.contact?.email || '',
                password: ''
            });

            // Establece el estado del grupo seleccionado basado en la información del usuario prop
            setGroup(user?.group != null ? {
                value: user?.group?.code, 
                label: `${user?.group?.value} - ${user?.group?.description}`, 
                data: user?.group 
            } : null)
        }
    }, [user]);

    // Efecto que se ejecuta al cargar el componente
    useEffect(() => {
        const fetchData = async () => {
            // Obtiene los activos usando el servicio AssetService y actualiza el estado de los grupos
            let res = await assetService.getAssets({ group: 'USER_GROUP' });

            if(res?.status == C.status.common.ok){
                setGroups(
                    res.data.map(x => ({ value: x.code, label: `${x.value} - ${x.description}`, data: x }))
                );
            }
        }

        fetchData();
    }, []);

    // Función para actualizar el usuario
    const updateUser = async (active = true) => {
        var data = {
            ...userData,
            isActive: active
        }

        if(!userData?.password) {
            data.password = null;
        } else {
            data.password = sha256(userData.password);
        }

        if(group) {
            data.group = group.value;
        }

        // Llama al servicio UserService para actualizar la información del usuario
        const response = await userService.setFullInfo(data);

        if (response?.status == C.status.common.ok) {
            // Llama a la función updateUserCallback con la respuesta del servidor y muestra una notificación
            updateUserCallback(response.data);
            toggleEdit();
            toast.success('Usuario Actualizado', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        setUserData(temp => ({...temp, password: ''}))
    };

    // Función para manejar el cambio de valor en los campos de entrada
    const handleInputChange = (e) => {
        const { name, value } = e?.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    // Función para alternar el modo de edición
    const toggleEdit = () => setEditable((value) => !value);

    // Renderizado del componente
    const clearForm = () => {
        setUserData({
            username: '',
            name: '',
            lastname: '',
            id: '',
            email: '',
            password: ''
        });
        setGroup(null);
        user = null;
    }

    return (
        <div>
            <div className="flex justify-end">
                <FaEdit onClick={toggleEdit} className="text-2xl mr-2 cursor-pointer hover:text-blue-500" title="Editar" />
                <FaPlus onClick={() => {clearForm(); setEditable(true)}} className="text-2xl cursor-pointer hover:text-green-500" title="Añadir Usuario" />
            </div>
            <div className="grid grid-cols-2 gap-4 p-6 text-base font-mono">
                <div className="col-span-2 flex flex-nowrap flex-col">
                    <p>Usuario</p>
                    <input
                        type="text"
                        name="username"
                        placeholder="Usuario"
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={userData.username}
                        disabled={!isEditable}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </div>

                <div className="col-span-2 flex flex-nowrap flex-col">
                    <p>Nombre(s)</p>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={userData.name}
                        disabled={!isEditable}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </div>

                <div className="col-span-2 flex flex-nowrap flex-col">
                    <p>Apellido(s)</p>
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Apellido"
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={userData.lastname}
                        disabled={!isEditable}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </div>

                <div className="col-span-2 flex flex-nowrap flex-col">
                    <p>Rol</p>

                    <Select
                        name="group"
                        value={group}
                        options={groups}
                        onChange={setGroup}
                        isClearable
                        isSearchable
                        placeholder="Selecciona un Rol"
                        isDisabled={!isEditable}
                    />
                </div>

                { (isEditable && group?.value != "STU") && <div className="col-span-2 flex flex-nowrap flex-col">
                    <p>Contraseña</p>
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={userData.password}
                        disabled={!isEditable}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </div> }

                <div className="col-span-2 flex flex-nowrap flex-col">
                    <p>Matricula/Numero de Empleado</p>
                    <input
                        type="text"
                        name="id"
                        placeholder="Matricula/Numero de Empleado"
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={userData.id}
                        disabled={!isEditable}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </div>

                <div className="col-span-2 flex flex-nowrap flex-col">
                    <p>Correo Electronico</p>
                    <input
                        type="text"
                        name="email"
                        placeholder="Correo Electronico"
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={userData.email}
                        disabled={!isEditable}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </div>

                { isEditable &&
                    <>
                        <button className="bg-green-500 text-white rounded-md px-4 py-2 mt-4" onClick={async () => await updateUser()}>
                            Guardar
                        </button>
                        {userData?.username && 
                            <button className="bg-red-500 text-white rounded-md px-4 py-2 mt-4" onClick={async () => await updateUser(false)}>
                                Eliminar
                            </button>
                        }
                    </>
                }
            </div>
            { isEditable && <button onClick={async () => await updateUser()} className="text-md mr-2 cursor-pointer hover:text-gray-700 hover:bg-green-300 bg-green-500 text-white rounded-md px-4 py-2 mt-4" title="Guardar"> 
            Guardar
            </button>}
        </div>
    );
};

export default AssetForm;
