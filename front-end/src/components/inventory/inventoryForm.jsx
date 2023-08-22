import React, { useEffect, useState } from 'react';
import { FaEdit, FaSave, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { C } from '../../constants/C';
import Select from 'react-select';
import InventoryService from '../../services/Inventory';
import AssetService from '../../services/Asset';

// Definir el componente de formulario de inventario
const InventoryForm = ({ item, updateInventoryCallback, asset, updateAssetCallback = () => {} }) => {
    // Crear instancias de servicios
    const assetService = new AssetService();
    const inventoryService = new InventoryService();

    // Estados para manejar los datos y opciones del formulario
    const [group, setGroup] = useState(null);
    const [groups, setGroups] = useState([]);
    const [groupLocation, setGroupLocation] = useState(null);
    const [groupsLocation, setGroupsLocation] = useState([]);
    const [isEditable, setEditable] = useState(false);
    const [itemData, setItemData] = useState({
        customKey: '',
        name: '',
        id: '',
        conditionUse: '',
        model: '',
        location: '',
    });

    // Cargar datos iniciales cuando se proporciona un 'item'
    useEffect(() => {
        if (item) {
            setItemData({
                customKey: item?.customKey || '',
                name: item?.name || '',
                id: item?.id || '',
                conditionUse: item?.conditionUse || '',
            });

            setGroup(item?.model != null ? {
                value: item?.model?.code, 
                label: `${item?.model?.value}`, 
                data: item?.model 
            } : null);

            setGroupLocation(item?.location != null ? {
                value: item?.location?.code, 
                label: `${item?.location?.value}`,
                data: item?.location
            } : null);
        }
    }, [item]);

    // Cargar datos de grupos y ubicaciones al montar el componente
    useEffect(() => {
        const fetchData = async () => {
            let res = await inventoryService.getItems({});
            
            if (res?.status == C.status.common.ok) {
                const uniqueData = res.data.filter((value, index, self) => {
                    return self.findIndex(item => item?.model?.code === value?.model?.code) === index;
                });
                const mappedData = uniqueData.map(x => ({
                    value: x?.model?.code,
                    label: `${x?.model?.value}`,
                    data: x?.model?.code
                }));
                setGroups(mappedData);
            }
            
            if (res?.status == C.status.common.ok) {
                const uniqueData = res.data.filter((value, index, self) => {
                    return self.findIndex(item => item?.model?.code === value?.model?.code) === index;
                });
                const mappedData2 = uniqueData.map(x => ({
                    value: x?.location?.code,
                    label: `${x?.location?.value}`,
                    data: x?.location?.code
                }));
                setGroupsLocation(mappedData2);
            }
        }
        fetchData();
    }, []);

    // Actualizar un elemento (activo o inactivo) en el inventario
    const updateItem = async (active = true) => {
        var data = {
            ...itemData,
            isActive: active
        };

        data.model = {
            code: group.value
        };
        
        data.location = {
            code: groupLocation.value
        };

        if (group) {
            data.model.code = group.value;
        }

        if (groupLocation) {
            data.location.code = groupLocation.value
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
        console.log(data);
    };

    // Manejar cambios en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value } = e?.target;
        setItemData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Cambiar el estado de edición
    const toggleEdit = () => setEditable((value) => !value);

    // Limpiar el formulario
    const clearForm = () => {
        setItemData({
            customKey: '',
            name: '',
            id: '',
            conditionUse: '',
            model: '',
            location: '',
        });
        setGroup(null);
        setGroupLocation(null);
        item = null;
    }
    return (
        <div>
            <div className="flex justify-end">
                <FaEdit onClick={toggleEdit} className="text-2xl mr-2 cursor-pointer hover:text-blue-500" title="Editar" />
                <FaPlus onClick={() => {clearForm(); setEditable(true)}} className="text-2xl cursor-pointer hover:text-green-500" title="Añadir Equipo" />
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
                    <Select
                        name="group"
                        value={group}
                        options={groups}
                        onChange={setGroup}
                        isClearable
                        isSearchable
                        placeholder="Selecciona un Modelo"
                        isDisabled={!isEditable}
                        required
                        
                    />
                </div>
                <div className="col-span-2 flex flex-nowrap flex-col">
                    <label htmlFor="objectItem" className="block mb-1 font-bold">Ubicacion</label>
                    <Select
                        name="groupLocation"
                        value={groupLocation}
                        options={groupsLocation}
                        onChange={setGroupLocation}
                        isClearable
                        isSearchable
                        placeholder="Selecciona una Ubicacion"
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
                
            
            { isEditable &&
                    <>
                            <button className="bg-green-500 text-white rounded-md px-4 py-2 mt-4" onClick={async () => await updateItem()}>
                                Guardar
                            </button>
                        
                        {itemData?.name && 
                            <button className="bg-red-500 text-white rounded-md px-4 py-2 mt-4" onClick={async () => await updateItem(false)}>
                                Eliminar
                            </button>
                        }
                    </>
                }
                </div>
        </div>
    );
};

export default InventoryForm;
