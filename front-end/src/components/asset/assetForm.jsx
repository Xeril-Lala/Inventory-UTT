import React, { useEffect, useState } from 'react';
import { FaUserPlus, FaTrash, FaEdit, FaUserEdit, FaSave, FaLaptopMedical } from 'react-icons/fa';
import AssetService from '../../services/Asset';
import { C } from '../../constants/C';
import { sha256 } from 'js-sha256';
import { toast } from 'react-toastify';

const AssetForm = ({ asset, updateAssetCallback = () => {} }) => {
    const assetService = new AssetService();

    const [isEditable, setEditable] = useState(false);
    const [assetData, setAssetData] = useState({
        code: '',
        value: '',
        description: '',
        //lastModified: '',
        auditUser: '',
    });

    useEffect(() => {
        if (asset) {
            setAssetData({
                code: asset?.code || '',
                value: asset?.value || '',
                description: asset?.description || '',
                //lastModified: asset?.lastModified || '',
                auditUser: asset?.auditUser || '',
            });
        }
    }, [asset]);

    const updateAsset = async (active = true) => {
        var data = {
            ...assetData,
            isActive: active
        }

        // if(!usertData?.password) {
        //     data.password = null;
        // } else {
        //     data.password = sha256(userData.password);
        // }

        const response = await assetService.setAsset(data);

        if (response?.status == C.status.common.ok) {
            updateAssetCallback(response.data);
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

        //setAssetData(temp => ({...temp, password: ''}))
    };

    const handleInputChange = (name, value) => {
        setAssetData((prevAssetData) => ({
            ...prevAssetData,
            [name]: value,
        }));
    };

    const toggleEdit = () => setEditable((value) => !value);

    const clearForm = () => setAssetData({
        code: '',
        value: '',
        description: '',
        //lastModified: '',
        auditUser: '',
    });

    return (
        <div>
            <div className="flex justify-end">
                <FaEdit onClick={toggleEdit} className="text-2xl mr-2 cursor-pointer hover:text-blue-500" title="Editar" />
                { isEditable && <FaSave onClick={async () => await updateAsset()} className="text-2xl mr-2 cursor-pointer hover:text-green-500" title="Guardar" /> }
                { isEditable && <FaLaptopMedical onClick={clearForm} className="text-2xl cursor-pointer hover:text-green-500" title="Crear Equipo" />}
            </div>
            <div className="grid grid-cols-2 gap-4 p-6 text-base font-mono">
                <div className="col-span-2 flex flex-nowrap flex-col">
                    <p>Codigo de Equipo</p>
                    <input
                        type="text"
                        name="code"
                        placeholder="Codigo de Equipo"
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={assetData.code}
                        disabled={!isEditable}
                        onChange={(e) => handleInputChange('code', e.target.value)}
                    />
                </div>

                <div className="col-span-2 flex flex-nowrap flex-col">
                    <p>Ubicacion</p>
                    <input
                        type="text"
                        name="value"
                        placeholder="Nombre"
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={assetData.value}
                        disabled={!isEditable}
                        onChange={(e) => handleInputChange('value', e.target.value)}
                    />
                </div>

                <div className="col-span-2 flex flex-nowrap flex-col">
                    <p>Descipcion</p>
                    <input
                        type="text"
                        name="description"
                        placeholder="Descipcion"
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={assetData.description}
                        disabled={!isEditable}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                </div>

                <div className="col-span-2 flex flex-nowrap flex-col">
                    <p>Auditor</p>
                    <input
                        type="text"
                        name="auditUser"
                        placeholder="Rol"
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={assetData.auditUser}
                        disabled={!isEditable}
                        onChange={(e) => handleInputChange('auditUser', e.target.value)}
                    />
                </div>
{/*
                { isEditable && <div className="col-span-2 flex flex-nowrap flex-col">
                    <p>Contraseña</p>
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={assetData.auditUser}
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
                        value={assetData.id}
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
                        value={assetData.email}
                        disabled={!isEditable}
                        onChange={handleInputChange}
                    />
                </div> */}
            </div>
        </div>
    );
};

export default AssetForm;