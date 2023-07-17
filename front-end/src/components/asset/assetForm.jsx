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
                { isEditable && <button onClick={async () => await updateAsset()} className="text-md mr-2 cursor-pointer hover:text-gray-700 hover:bg-green-300 bg-green-500 text-white rounded-md px-4 py-2 mt-4" title="Guardar">
                    Guardar
                    </button>}
            </div>
        </div>
    );
};

export default AssetForm;