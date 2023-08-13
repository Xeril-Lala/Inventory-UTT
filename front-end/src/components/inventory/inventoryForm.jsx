import React, { useEffect, useState } from 'react';
import { FaEdit, FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { C } from '../../constants/C';
import Select from 'react-select';
import InventoryService from '../../services/Inventory';
import AssetService from '../../services/Asset';

const InventoryForm = ({item, updateInventoryCallback, asset, updateAssetCallback = () => {} }) => {

    const assetService = new AssetService();
    const inventoryService = new InventoryService();
    const [group, setGroup] = useState(null);
    const [groups, setGroups] = useState([]); 
    const [isEditable, setEditable] = useState(false);
    const [itemData, setItemData] = useState({
        customKey: '',
        name: '',
        id: '',
        model:'',
        location:'', //combobox
        about: '',
        conditionUse: '',
    });

    useEffect(() => {
        if (item) {
            setItemData({
                customKey: item?.customKey || '',
                name: item?.name || '',
                id: item?.id || '',
                //model: item?.model.value || '',
                //location: item?.location?.value || '',
                //about: item?.about || '',
                conditionUse: item?.conditionUse || '',
            });
            setGroup(item?.location?.value != null ? {
                value: item?.location?.value, 
                label: `${item?.location?.value}`, 
                data: item?.location?.value 
            } : null)
        }
    }, [item]);

    useEffect(() => {
        const fetchData = async () => {
            let res = await inventoryService.getItems({ group: 'MODEL'});
            
            if (res?.status == C.status.common.ok) {
                // Filtrar elementos duplicados
                const uniqueData = res.data.filter((value, index, self) => {
                    return self.findIndex(item => item?.location?.value === value?.location?.value) === index;
                });
            
                // Mapear los elementos únicos
                const mappedData = uniqueData.map(x => ({
                    value: x?.location?.value,
                    label: `${x?.location?.value}`,
                    data: x?.location?.value
                }));
            
                setGroups(mappedData);
            }
            
        }
        fetchData();
    }, []);

    const updateItem = async (active = true) => {
        var data = {
            ...itemData,
            isActive: active
        }
        if(group) {
            data.group = group?.location?.value;
        }
        const response = await inventoryService.setItem(data);


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

    };

    const handleInputChange = (event) => {
        const { name, value } = event?.target;
        setItemData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const toggleEdit = () => setEditable((value) => !value);

    const clearForm = () => {
        setItemData({
            name: '',
            customKey: '',
            model: '',
            serial: '',
            conditionUse: '',
        })
        item = null;
    }

    return (
        <div>
            <div className="flex justify-end">
                <FaEdit onClick={toggleEdit} className="text-2xl mr-2 cursor-pointer hover:text-blue-500" title="Editar" />
                
            </div>
            
            <div className="grid grid-cols-2 gap-4 p-6 text-base font-mono">
                <div className="col-span-2 flex flex-nowrap flex-col">
                <label htmlFor="objectItem" className="block mb-1 font-bold">Serial</label>
                    <input
                        type="text"
                        name="customKey"
                        placeholder=""
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={itemData.customKey}
                        disabled={!isEditable}
                        onChange={handleInputChange}
                        autoComplete="off"
                        required
                    />
                </div> 
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
                        required
                    />
                </div>
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
                        required
                    />
                </div> 
                <div className="col-span-2 flex flex-nowrap flex-col">
                    <label htmlFor="objectItem" className="block mb-1 font-bold">Localizacion</label>
                    <Select
                        name="group"
                        value={group}
                        options={groups}
                        onChange={setGroup}
                        isClearable
                        isSearchable
                        placeholder="Selecciona una Localizacion"
                        isDisabled={!isEditable}
                        required
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
                        required
                    />
                </div>
                
            </div>
            { isEditable &&
                    <>
                        <button className="bg-green-500 text-white rounded-md px-4 py-2 mt-4 w-1/3 mr-12" onClick={async () => await updateItem()}>
                            Guardar
                        </button>
                        {itemData?.name && 
                            <button className="bg-red-500 text-white rounded-md px-4 py-2 mt-4 w-1/3" onClick={async () => await updateItem(false)}>
                                Eliminar
                            </button>
                        }
                    </>
                }
        </div>
    );
};

export default InventoryForm;
