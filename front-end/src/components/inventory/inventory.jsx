import React, { useEffect, useState } from 'react';
import { FiFilter, FiAlertCircle } from 'react-icons/fi';
import { MdLaptop } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { C } from '../../constants/C.js';
import { downloadFile } from '../../constants/utils.js';
import CustomTable from '../customTable/customTable.jsx';
import '../customTable/customStyle.css';
import Select from 'react-select';
import { formatDate } from '../../constants/utils.js';
import { FaDownload, FaFileExcel, FaFileDownload } from 'react-icons/fa';
import InputFiles from 'react-input-files';
import InventoryService from '../../services/Inventory.js';
import InventoryForm from '../inventory/inventoryForm.jsx';
import { toast } from 'react-toastify';
import {RiFileExcel2Fill} from 'react-icons/ri';


const Inventory = () => {
    const inventoryService = new InventoryService();

    const [file, setFile] = useState(null);
    const [item, setItem] = useState(null);
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setGroup] = useState(null);
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let res = await inventoryService.getItems({});

            if(res?.status == C.status.common.ok){
                setGroups(
                    res.data.map(x => ({value: x.code, label: `${x.value} - ${x.description}`, data:x })),
                    console.log(res.data),
                );
                
            }
        }
        fetchData();
    }, []);


    const convertData = response => {
            if (response?.status == C.status.common.ok) {
                let res = response?.data;
                let filterData = res.filter(x => {
                let flag1 = x?.model?.group == 'MODEL';
                let flag2 = !selectedGroup || x?.code == selectedGroup?.value;
            
                return flag1 && flag2;
                });
                return filterData.map(x => ({
                    name: x.name,
                    id: x.id,
                    isActive: x.isActive,
                    group: x.model.group,
                    subGroup: x.model.subGroup,
                    value: x.location.value,
                    customKey: x.customKey,
                    about: x.about,
                    acquisition: x.acquisition,
                    auditUser: x.auditUser,
                    conditionUse: x.conditionUse,
            }));
            } else return [];
            
    }
    const getItemInfo = async (row) => {
        console.log(row);

        var res = await inventoryService.getItem(row.id);

        if(res?.status == C.status.common.ok){
            setItem(res.data);
        }
    };

    const selectGroup = (value) => {
        setGroup(value);
        setTrigger(val => !val)
    } 

    const onSelectExcel = async (files) => {

        if(files?.length > 0) {
            let file = files[0];

            toast.promise(inventoryService.setItemExcel(file), {
                pending: 'Subiendo Excel...',
                success: 'Excel cargado exitosamente',
                error: 'Error Subiendo Excel - Favor de revisar el formato subido'
            });

            setTrigger(val => !val);
        }
    }

    const columns = [
        {
            name: 'Id',
            selector: 'id',
            width: '4%'
        },
        {
            name: 'Nombre',
            selector: 'name',
            width: '10%'
        },
        {
            name: 'Estado',
            selector: 'loan',
            width: '5%'
        },
        {
            name: 'Grupo',
            selector: 'group',
            width: '5%'
        },
        {
            name: 'Sub Grupo',
            selector: 'subGroup',
            width: '7%'
        },
        {
            name: 'Localizacion',
            selector: 'value',
            width: '10%'
        },
        {
            name: 'Custom Key',
            selector: 'customKey',
            width: '7%'
        },
        {
            name: 'About',
            selector: 'about',
            width: '10%'
        },
        {
            name: 'Auditor',
            selector: 'auditUser',
            width: '6%'
        },
        {
            name: 'Condicion',
            selector: 'conditionUse',
            width: '10%'
        }
    ];

    return (
        <div className="mx-4 sm:mx-auto h-auto">

            {/* <div className="grid grid-cols-6  rounded-md shadow-md bg-white p-2 my-2">
                <Select 
                    className="col-span-3" 
                    value={selectedGroup}
                    options={groups}
                    onChange={selectGroup}
                    isClearable
                    isSearchable
                    placeholder="Filtrar por Rol o Grupo"
                />
                <div className="flex col-span-2 col-start-5 flex-row-reverse mr-4">
                    <FaFileDownload onClick={() => downloadFile(C.media.userTemplate, `User-Inventory-Template.xlsx`)} className="text-2xl my-auto mr-2 cursor-pointer hover:text-blue-500" title="Descargar Excel" />
                    <div className="my-auto mt-2 mr-2 cursor-pointer">
                        <InputFiles accept=".xlsx" onChange={onSelectExcel} >
                            <RiFileExcel2Fill className="text-2xl cursor-pointer hover:text-blue-500" title="Subir Excel" />
                        </InputFiles>
                    </div>
                </div>
            </div> */}

            <div className="grid grid-cols-6 gap-4 md:auto-cols-min">
                <div className="col-span-4 rounded-md shadow-md bg-white p-6" >
                    <CustomTable
                        title={'Lista de Equipos'}
                        columns={columns}
                        styles={C.styles.dataTable}
                        onSelectRow={getItemInfo}
                        onHook={async () => await inventoryService.getItems({})}
                        convertData={convertData}
                        triggerRefresh={trigger}
                    />
                </div>

                <div className="col-span-2 rounded-md shadow-md bg-white p-6">
                    <div className="flex col-span-2 col-start-5 flex-row-reverse mr-4">
                    <FaFileDownload onClick={() => downloadFile(C.media.inventoryTemplate, `Inventory-Inventory-Template.xlsx`)} className="text-2xl my-auto mr-2 cursor-pointer hover:text-blue-500" title="Descargar Excel" />
                    <div className="my-auto mt-2 mr-2 cursor-pointer">
                        <InputFiles accept=".xlsx" onChange={onSelectExcel} >
                            <RiFileExcel2Fill className="text-2xl cursor-pointer hover:text-blue-500" title="Subir Excel" />
                        </InputFiles>
                    </div>
                </div>
                <div className="h-auto text-center text-xl">Añadir/Modificar un Elemento</div>
                
                    <InventoryForm
                        item={item}
                        updateInventoryCallback={ item => {
                            setItem(item);
                            setTrigger(val => !val)
                        }}/>
                    {/* <div>
                        <p>Subir Archivo de Inventario</p>
                        <ItemExcel/>
                    </div> */}
                </div>

            </div>
        </div>
    );
};

export default Inventory;