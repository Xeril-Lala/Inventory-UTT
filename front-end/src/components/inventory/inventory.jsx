import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { C } from '../../constants/C.js';
import { downloadFile, formatDate } from '../../constants/utils.js';
import CustomTable from '../customTable/customTable.jsx';
import '../customTable/customStyle.css';
import { FaFileDownload } from 'react-icons/fa';
import InputFiles from 'react-input-files';
import InventoryService from '../../services/Inventory.js';
import InventoryForm from '../inventory/inventoryForm.jsx';
import { toast } from 'react-toastify';
import {RiFileExcel2Fill} from 'react-icons/ri';


const Inventory = () => {
    const inventoryService = new InventoryService();
    const [item, setItem] = useState(null);
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setGroup] = useState(null);
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let res = await inventoryService.getItems({});

            if (res?.status == C.status.common.ok) {
                // Filtrar elementos duplicados
                const uniqueData = res.data.filter((value, index, self) => {
                    return self.findIndex(item => item?.model?.value === value?.model?.value) === index;
                });
            
                // Mapear los elementos únicos
                const mappedData = uniqueData.map(x => ({
                    value: x?.model?.code,
                    label: `${x?.model?.value}`,
                    data: x
                }));
            console.log(mappedData);

            setGroups(mappedData);
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
                return res.map(x => ({
                    id: x.id,
                    customKey: x.customKey,
                    name: x.name,
                    model: x.model.value,
                    //lastModified: formatDate(x?.model?.lastModified, false),
                    location: x?.location?.value,
                    acquisition: formatDate(x.acquisition, false),
                    condition: x.conditionUse,
                    isUsed: x.isActive,
                    //image: 
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
            name: 'Serial',
            selector: 'customKey',
            wrap: true,
            width: '11%'
        },
        {
            name: 'Nombre',
            selector: 'name',
            wrap: true,
            //width: '10%'
        },
        {
            name: 'Modelo',
            selector: 'model',
            wrap: true,
            width: '11%'
        },
        {
            name: 'Ejercicio',
            selector: 'acquisition',
            wrap: true,
            width: '11%'
        },
        {
            name: 'Localizacion',
            selector: 'location',
            wrap: true,
            //width: '10%'
        },
        {
            name: 'Condicion',
            selector: 'condition',
            wrap: true,
            ///width: '7%'
        },
        {
            name: 'Estado',
            selector: 'isActive',
            wrap: true,
            width: '7%',
            conditionalCellStyles: [
                {
                    when: x => x.isActive = true,
                    style: {
                        backgroundColor: 'rgba(63, 195, 128, 0.9)',
                        color: 'white',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                },
                {
                    when: x => x.isActive = !true,
                    style: {
                        backgroundColor: 'rgba(248, 148, 6, 0.9)',
                        color: 'white',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                },
            ],
        },
    ];

    return (
        <div className="mx-4 sm:mx-auto h-auto">
            <div className="grid grid-cols-6 gap-4 md:auto-cols-min">
            <Select 
                    className="col-span-3" 
                    value={selectedGroup}
                    options={groups}
                    onChange={selectGroup}
                    isClearable
                    isSearchable
                    placeholder="Filtrar Grupo"
                />
                <div className="col-span-4 rounded-md shadow-md bg-white p-6" >
                    <CustomTable
                        title={'Lista de Equipos'}
                        columns={columns}
                        styles={C.styles.dataTable}
                        onSelectRow={getItemInfo}
                        onHook={async () => await inventoryService.getItems({model: selectedGroup?.value || null})}
                        convertData={convertData}
                        triggerRefresh={trigger}
                    />
                </div>

                <div className="col-span-2 rounded-md shadow-md bg-white p-6">
                    <div className="flex col-span-2 col-start-5 flex-row-reverse mr-4">
                    <FaFileDownload onClick={() => downloadFile(C.media.itemTemplate, `Inventory-Inventory-Template.xlsx`)} className="text-2xl my-auto mr-2 cursor-pointer hover:text-blue-500" title="Descargar Excel" />
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
                </div>
            </div>
        </div>
    );
};

export default Inventory;