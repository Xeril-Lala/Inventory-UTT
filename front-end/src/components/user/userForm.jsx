import React, { useEffect, useState } from 'react';
import { FaUserPlus, FaTrash, FaEdit, FaUserEdit, FaSave } from 'react-icons/fa';
import UserService from '../../services/User';
import { C } from '../../constants/C';
import { sha256 } from 'js-sha256';
import { toast } from 'react-toastify';

const UserForm = ({ user, updateUserCallback = () => {} }) => {
    const userService = new UserService();
    
    const [isEditable, setEditable] = useState(false);
    const [userData, setUserData] = useState({
        username: '',
        name: '',
        lastname: '',
        group: '',
        id: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        if (user) {
            setUserData({
                username: user?.username || '',
                name: user?.name || '',
                lastname: user?.lastname || '',
                group: user?.group?.code || '',
                id: user?.contact?.id || '',
                email: user?.contact?.email || '',
                password: ''
            });
        }
    }, [user]);

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

        const response = await userService.setFullInfo(data);

        if (response?.status == C.status.common.ok) {
            updateUserCallback(response.data);
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    const toggleEdit = () => setEditable((value) => !value);

    const clearForm = () => setUserData({
        username: '',
        name: '',
        lastname: '',
        group: '',
        id: '',
        email: '',
        password: ''
    });

    return (
        <div>
            <div className="flex justify-end">
                <FaEdit onClick={toggleEdit} className="text-2xl mr-2 cursor-pointer hover:text-blue-500" title="Editar" />
                { isEditable && <FaSave onClick={async () => await updateUser()} className="text-2xl mr-2 cursor-pointer hover:text-green-500" title="Guardar" /> }
                { isEditable && <FaUserPlus onClick={clearForm} className="text-2xl cursor-pointer hover:text-green-500" title="Crear Usuario" />}
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
                    <input
                        type="text"
                        name="group"
                        placeholder="Rol"
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={userData.group}
                        disabled={!isEditable}
                        onChange={handleInputChange}
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
        </div>
    );
};

export default UserForm;