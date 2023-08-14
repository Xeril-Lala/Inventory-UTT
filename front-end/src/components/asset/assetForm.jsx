import { sha256 } from 'js-sha256';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaSave } from 'react-icons/fa';
import { RiImageAddFill } from 'react-icons/ri'; 
import Select from 'react-select';
import { toast } from 'react-toastify';
import { C } from '../../constants/C';
import AssetService from '../../services/Asset';
import UserService from '../../services/User';

const AssetForm = ({ user, updateUserCallback, asset, updateAssetCallback = () => {} }) => {
    const userService = new UserService();
    const assetService = new AssetService();
    
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState(null);
    const [isEditable, setEditable] = useState(false);
    const [assetData, setAssetData] = useState({
        code: '',
        value: '',
        group: '',
        subGroup: '',
        alternativeGroup: '',
        description: '',
        auditUser: '',
        
    });

    useEffect(() => {
        if (asset) {
            setAssetData({
                code: asset?.code || '',
                value: asset?.value || '',
                group: asset?.group || '',
                subGroup: asset?.subGroup || '',
                alternativeGroup: asset?.alternativeGroup || '',
                description: asset?.description || '',
                auditUser: asset?.auditUser || '',
            });

            setGroup(user?.group != null? {
                value: user?.group?.code, 
                label: `${user?.group?.value} - ${user?.group?.description}`, 
                data: user?.group 
            } : null)
        }
    }, [asset]);

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

    const updateAsset = async (active = true) => {
        var data = {
            ...assetData,
            isActive: active
        }

        if(group) {
            data.group = group.value;
        }

        const response = await assetService.setAsset(data);


        if (response?.status == C.status.common.ok) {
            updateAssetCallback(response.data);
            toggleEdit();
            toast.success('Elemento Actualizado', {
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
    };

    const handleInputChange = (e) => {
        const { name, value } = e?.target;
        setAssetData((prevAssetData) => ({
            ...prevAssetData,
            [name]: value,
        }));
    };

    const toggleEdit = () => setEditable((value) => !value);

    return (
        <div>
            <div className="flex justify-end">
                <FaEdit onClick={toggleEdit} className="text-2xl mr-2 cursor-pointer hover:text-blue-500" title="Editar" />
                
            </div>
            <div className="grid grid-cols-2 gap-4 p-6 text-base font-mono">
                <div className="col-span-2 flex flex-nowrap flex-col">
                <label htmlFor="objectItem" className="block mb-1 font-bold">Codigo</label>
                    <input
                        type="text"
                        name="code"
                        placeholder=""
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={assetData.code}
                        disabled={!isEditable}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="col-span-2 flex flex-nowrap flex-col">
                <label htmlFor="objectItem" className="block mb-1 font-bold">Nombre</label>
                    <input
                        type="text"
                        name="value"
                        placeholder=""
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={assetData.value}
                        disabled={!isEditable}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="col-span-2 flex flex-nowrap flex-col">
                <label htmlFor="objectItem" className="block mb-1 font-bold">Descripcion</label>
                    <input
                        type="text"
                        name="description"
                        placeholder=""
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={assetData.description}
                        disabled={!isEditable}
                        onChange={handleInputChange}
                    />
                </div>

            </div>
            { isEditable && <button onClick={async () => await updateAsset()} className="text-md mr-2 cursor-pointer hover:text-gray-700 hover:bg-green-300 bg-green-500 text-white rounded-md px-4 py-2 mt-4" title="Guardar"> 
            Guardar
            </button>}
        </div>
    );
};

export default AssetForm;
