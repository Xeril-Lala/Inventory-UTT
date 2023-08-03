import { sha256 } from 'js-sha256';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaSave } from 'react-icons/fa';
import { RiImageAddFill } from 'react-icons/ri'; 
import Select from 'react-select';
import { toast } from 'react-toastify';
import { C } from '../../constants/C';
import AssetService from '../../services/Asset';
import UserService from '../../services/User';
import InventoryService from '../../services/Inventory';


const InventoryForm = ({ user, updateUserCallback, asset, updateAssetCallback, item, updateInventoryCallback = () => {} }) => {
    const userService = new UserService();
    const assetService = new AssetService();
    const inventoryService = new InventoryService();
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState(null);
    const [isEditable, setEditable] = useState(false);
    const [itemData, setItemData] = useState({

        name: '',
        customKey: '',
        about: '',
        model: '',
        location: '',
        serial: '',
        conditionUse: '',
    });

    useEffect(() => {
        if (item) {
            setItemData({
                name: item?.name || '',
                customKey: item?.customKey || '',
                about: item?.about || '',
                model: item?.model?.code || '',
                location: item?.location?.code || '',
                serial: item?.serial || '',
                conditionUse: item?.conditionUse || '',
            });
        }
    }, [item]);

//     setGroup(user?.group != null? {
//         value: user?.group?.code, 
//         label: `${user?.group?.value} - ${user?.group?.description}`, 
//         data: user?.group 
//     } : null)
// }
// }, [item]);

    useEffect(() => {
        const fetchData = async () => {
            // let res = await inventoryService.getItem({ group: 'USER_GROUP' });
            let res = await inventoryService.getItems({});
            if(res?.status == C.status.common.ok){
                setGroups(
                    res.data.map(x => ({ value: x.code, label: `${x.value} - ${x.description}`, data: x }))
                );
            }
        }

        fetchData();
    }, []);

    const updateItem = async (active = true) => {
        var data = {
            ...itemData,
            isActive: active
        }

        // if(!userData?.password) {
        //     data.password = null;
        // } else {
        //     data.password = sha256(userData.password);
        // }

        // if(group) {
        //     data.group = group.value;
        // }

        //const response = await userService.setFullInfo(data);
        const response = await InventoryService.setItem(data);


        if (response?.status == C.status.common.ok) {
            updateInventoryCallback(response.data);
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

        //setUserData(temp => ({...temp, password: ''}))
    };

    // const handleInputChange = (e) => {
    //     const { name, value } = e?.target;
    //     setUserData((prevUserData) => ({
    //         ...prevUserData,
    //         [name]: value,
    //     }));
    // };

    const handleInputChange = (e) => {
        const { name, value } = e?.target;
        setItemData((prevItemData) => ({
            ...prevItemData,
            [name]: value,
        }));
    };

    const toggleEdit = () => setEditable((value) => !value);

    return (
        <div>
            <div className="flex justify-end">
                <FaEdit onClick={toggleEdit} className="text-2xl mr-2 cursor-pointer hover:text-blue-500" title="Editar" />
                
                {/* { isEditable && <FaTrash className="text-2xl cursor-pointer hover:text-red-500" title="Desactivar" />} */}
            </div>
            <div className="grid grid-cols-2 gap-4 p-6 text-base font-mono">
                <div className="col-span-2 flex flex-nowrap flex-col">
                <label htmlFor="objectItem" className="block mb-1 font-bold">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        placeholder=""
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={itemData.name}
                        disabled={!isEditable}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </div>

                <div className="col-span-2 flex flex-nowrap flex-col">
                <label htmlFor="objectItem" className="block mb-1 font-bold">Custom Key</label>
                    <input
                        type="text"
                        name="customKey"
                        placeholder=""
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={itemData.customKey}
                        disabled={!isEditable}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </div>

                <div className="col-span-2 flex flex-nowrap flex-col">
                <label htmlFor="objectItem" className="block mb-1 font-bold">Procedencia</label>
                    <input
                        type="text"
                        name="about"
                        placeholder=""
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={itemData.about}
                        disabled={!isEditable}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </div>

                {/* <div className="col-span-2 flex flex-nowrap flex-col">
                <label htmlFor="objectItem" className="block mb-1 font-bold">Rol</label>

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
                </div> */}

                {/* { isEditable && <div className="col-span-2 flex flex-nowrap flex-col">
                    <p>Sub Grupo</p>
                    <input
                        type="subGroup"
                        name="subGroup"
                        placeholder=""
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={assetData.subGroup}
                        disabled={!isEditable}
                        onChange={handleInputChange}
                    />
                </div> } */}

                <div className="col-span-2 flex flex-nowrap flex-col">
                <label htmlFor="objectItem" className="block mb-1 font-bold">Modelo</label>
                    <input
                        type="text"
                        name="model"
                        placeholder=""
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={itemData.model}
                        disabled={!isEditable}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </div>

                <div className="col-span-2 flex flex-nowrap flex-col">
                <label htmlFor="objectItem" className="block mb-1 font-bold">Localizacion</label>
                    <input
                        type="text"
                        name="location"
                        placeholder=""
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={itemData.location}
                        disabled={!isEditable}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </div>

                <div className="col-span-2 flex flex-nowrap flex-col">
                <label htmlFor="objectItem" className="block mb-1 font-bold">Serial</label>
                    <input
                        type="text"
                        name="serial"
                        placeholder=""
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={itemData.serial}
                        disabled={!isEditable}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </div>
                <div className="col-span-2 flex flex-nowrap flex-col">
                <label htmlFor="objectItem" className="block mb-1 font-bold">Condicion de Uso</label>
                    <input
                        type="text"
                        name="conditionUse"
                        placeholder=""
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={itemData.conditionUse}
                        disabled={!isEditable}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </div>
                <div className="col-span-2 flex flex-nowrap flex-col">
                <label htmlFor="objectItem" className="block mb-1 font-bold">Imagen Relacionada</label>
                    <input
                        type="file"
                        name=""
                        placeholder=""
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        //value={assetData.auditUser}
                        //disabled={!isEditable}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </div>
            </div>
            { isEditable && <button onClick={async () => await updateItem()} className="text-md mr-2 cursor-pointer hover:text-gray-700 hover:bg-green-300 bg-green-500 text-white rounded-md px-4 py-2 mt-4" title="Guardar"> 
            Guardar
            </button>}
        </div>
    );
};

export default InventoryForm;
