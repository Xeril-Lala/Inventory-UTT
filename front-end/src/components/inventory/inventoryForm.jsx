import { sha256 } from 'js-sha256'; // Importa la función de hash sha256 de la librería 'js-sha256'
import React, { useEffect, useState } from 'react'; // Importa React, useEffect y useState desde la librería 'react'
import { FaEdit, FaSave } from 'react-icons/fa'; // Importa los iconos FaEdit y FaSave desde la librería 'react-icons/fa'
import Select from 'react-select'; // Importa el componente Select de la librería 'react-select'
import { toast } from 'react-toastify'; // Importa la función toast de la librería 'react-toastify'
import { C } from '../../constants/C'; // Importa la constante C desde el archivo '../../constants/C'
import AssetService from '../../services/Asset'; // Importa el servicio AssetService desde el archivo '../../services/Asset'
import UserService from '../../services/User'; // Importa el servicio UserService desde el archivo '../../services/User'
import InventoryService from '../../services/Inventory';

// Definición del componente AssetForm
const InventoryForm = ({ user, updateUserCallback = () => {} }, { item, updateItemCallback = () => {} }) => {
    const userService = new UserService(); // Instancia el servicio UserService
    const assetService = new AssetService(); // Instancia el servicio AssetService
    const inventoryService = new InventoryService(); // Instancia el servicio ItemService    

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
    const [itemData, setItemData] = useState({ // Estado para almacenar los datos del equipo
        name: '',
        customKey: '',
        about: '',
        acquisition: '',
        model: '',
        location: '',
        serial: '',
        conditionUse: '',
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

        // Efecto que se ejecuta cuando cambia el item
        useEffect(() => {
            if (item) {
                // Actualiza el estado de los datos de los items basado en la información del item prop
                setItemData({
                    name: '',
                    customKey: '',
                    about: '',
                    acquisition: '',
                    model: '',
                    location: '',
                    serial: '',
                    conditionUse: '',
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

    // Función para actualizar el usuario
    const updateItem = async (active = true) => {
        var data = {
            ...itemData,
            isActive: active
        }

        // if(!itemData?.password) {
        //     data.password = null;
        // } else {
        //     data.password = sha256(userData.password);
        // }

        if(group) {
            data.group = group.value;
        }

        // Llama al servicio ItemService para actualizar la información del item
        const response = await inventoryService.setItem(data);

        if (response?.status == C.status.common.ok) {
            // Llama a la función updateUserCallback con la respuesta del servidor y muestra una notificación
            updateItemCallback(response.data);
            toggleEdit();
            toast.success('Equipo Actualizado', {
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

        // setUserData(temp => ({...temp, password: ''}))
    };

    // Función para manejar el cambio de valor en los campos de entrada
    const handleInputChange = (e) => {
        const { item, value } = e?.target;
        setItemData((prevItemData) => ({
            ...prevItemData,
            [item]: value,
        }));
    };

    // Función para alternar el modo de edición
    const toggleEdit = () => setEditable((value) => !value);

    // Renderizado del componente
    return (
        <div>
            <div className="flex justify-end">
                <FaEdit onClick={toggleEdit} className="text-2xl mr-2 cursor-pointer hover:text-blue-500" title="Editar" />
                
                {/* { isEditable && <FaTrash className="text-2xl cursor-pointer hover:text-red-500" title="Desactivar" />} */}
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

                { isEditable && <div className="col-span-2 flex flex-nowrap flex-col">
                    <p>Contraseña</p>
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={userData.password}
                        disabled={!isEditable}
                        onChange={handleInputChange}
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
                    />
                </div>
            </div>
            { isEditable && <button onClick={async () => await updateUser()} className="text-md mr-2 cursor-pointer hover:text-gray-700 hover:bg-green-300 bg-green-500 text-white rounded-md px-4 py-2 mt-4" title="Guardar"> 
            Guardar
            </button>}
        </div>
    );
};

export default InventoryForm;
