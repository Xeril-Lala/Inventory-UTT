import { sha256 } from 'js-sha256';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaSave } from 'react-icons/fa';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { C } from '../../constants/C';
import InventoryService from '../../services/Inventory.js';

const InventoryForm = ({ item, updateItemCallback = () => {} }) => {
    const inventoryService = new InventoryService();
    
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState(null);
    const [isEditable, setEditable] = useState(false);
    const [itemData, setItemData] = useState({
        name: '',
        group: '',
        value: '',
        auditUser: '',
        location: '',
    });

    useEffect(() => {
        if (item) {
            setItemData({
                name: item?.name || '',
                group: item?.location?.value || '',
                value: item?.model?.group || '',
                auditUser: item?.auditUser || '',
                location: item?.location?.description || '',
            });

            setGroup(item?.group != null? {
                value: item?.group?.code, 
                label: `${item?.group?.value} - ${item?.group?.description}`, 
                data: item?.group 
            } : null)
        }
    }, [item]);

    useEffect(() => {
        const fetchData = async () => {
            let res = await inventoryService.getItems({ group: '' });

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

        // if(!itemData?.password) {
        //     data.password = null;
        // } else {
        //     data.password = sha256(itemData.password);
        // }

        if(group) {
            data.group = group.value;
        }

        const response = await inventoryService.setItem(data);

        if (response?.status == C.status.common.ok) {
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

        // setItemData(temp => ({...temp, password: ''}))
    };

    const handleInputChange = (e) => {
        const { item, value } = e?.target;
        setItemData((prevItemData) => ({
            ...prevItemData,
            [item]: value,
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
                    <p>Nombre del equipo</p>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre del equipo"
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={itemData.name}
                        disabled={!isEditable}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="col-span-2 flex flex-nowrap flex-col">
                    <p>Modelo</p>
                    <input
                        type="text"
                        name="value"
                        placeholder="Modelo"
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={itemData.value}
                        disabled={!isEditable}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="col-span-2 flex flex-nowrap flex-col">
                    <p>Group</p>
                    <input
                        type="text"
                        name="group"
                        placeholder="Grupo"
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={itemData.group}
                        disabled={!isEditable}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="col-span-2 flex flex-nowrap flex-col">
                    <p>Rol de Editor</p>

                    <Select
                        name="Usuario que Edita"
                        value={group}
                        options={groups}
                        onChange={setGroup}
                        isClearable
                        isSearchable
                        placeholder="Selecciona un Rol"
                        isDisabled={!isEditable}
                    />
                </div>

                <div className="col-span-2 flex flex-nowrap flex-col">
                    <p>Localización</p>

                    <input
                        type="text"
                        name="location"
                        placeholder="Localización"
                        className="bg-gray-100 rounded-md p-2 appearance-textfield"
                        value={itemData.description}
                        disabled={!isEditable}
                        onChange={handleInputChange}
                    />
                </div>

                {/* { isEditable && <div className="col-span-2 flex flex-nowrap flex-col">
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
                </div> } */}

                {/* <div className="col-span-2 flex flex-nowrap flex-col">
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
                </div> */}

                {/* <div className="col-span-2 flex flex-nowrap flex-col">
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
                </div> */}
            </div>
            { isEditable && <button onClick={async () => await updateItem()} className="text-md mr-2 cursor-pointer hover:text-gray-700 hover:bg-green-300 bg-green-500 text-white rounded-md px-4 py-2 mt-4" title="Guardar"> 
            Guardar
            </button>}
        </div>
    );
};

export default InventoryForm;
