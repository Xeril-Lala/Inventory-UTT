import React, { useEffect, useState } from 'react';
import { FiFilter, FiAlertCircle } from 'react-icons/fi';
import { MdLaptop } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { C } from '../../constants/C.js';
import CustomTable from '../customTable/customTable.jsx';
import '../customTable/customStyle.css';
import Select from 'react-select';
import { formatDate } from '../../constants/utils.js';
import InventoryService from '../../services/Inventory.js';
import InventoryForm from '../inventory/inventoryForm.jsx';


const Inventory = () => {
    const inventoryService = new InventoryService();

    const [item, setItem] = useState(null);
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setGroup] = useState(null);
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let res = await inventoryService.getItems({ location: ''});

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
                return filterData.map(x => [
                x.name,
                x.about,
                x.adquisition,
                x?.group?.value ?? 'NA',
                formatDate(x?.model?.lastModified),
                x?.location?.value,
                ]);
            } else return [];
            
    }
    const getItemInfo = async (row) => {
        console.log(row);

        var res = await inventoryService.getItem(row[0]);

        if(res?.status == C.status.common.ok){
            setItem(res.data);
        }
    };

    const selectGroup = (value) => {
        setGroup(value);
        setTrigger(val => !val)
    } 
    const columns = [
        {
            name: 'Nombre',
            selector: row => row[0],
            sortable: true,
            width: '40%',

        },
        {
            name: 'Relacionado',
            selector: row => row[1],
            sortable: true,
            width: '15%',
        },
        // {
        //     name: 'Adquisicion',
        //     selector: row => row[2],
        //     sortable: true,
        // },
        // {
        //     name: 'Grupo',
        //     selector: row => row[2],
        //     sortable: true,
        // },
        {
            name: 'Fecha de Modificacion',
            selector: row => row[4],
            sortable: true,
            width: '20%',
        },
        {
            name: 'Localizacion',
            selector: row => row[5],
            sortable: true,
        },
    ];

    return (
        <div className="mx-4 sm:mx-auto h-auto">
            <div className="h-auto text-3xl mb-6">Equipos</div>

            <div className="grid grid-cols-6 ga rounded-md shadow-md bg-white p-2 my-2">
                <Select 
                    className="col-span-3" 
                    value={selectedGroup}
                    options={groups}
                    onChange={selectGroup}
                    isClearable
                    isSearchable
                    placeholder="Filtrar por Rol o Grupo"
                    
                />
            </div>

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
                    <div className="h-auto text-center text-xl">Equipo</div>
                    <InventoryForm
                        item={item}
                        updateItemCallback={ item => {
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