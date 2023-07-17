import { C } from '../../constants/C.js';
import CustomTable from '../customTable/customTable.jsx';
import InventoryService from '../../services/Inventory.js';
import React, { useState, useEffect } from 'react';
import '../customTable/customStyle.css';
import Select from 'react-select';


const Historical = () => {
    const itemService = new InventoryService();
    const [items, setItems] = useState(null);

    const [groups, setGroups] = useState([]);
    const [selectedGroup, setGroup] = useState(null);
    const [trigger, setTrigger] = useState(false);



    useEffect(() => {
        const fetchData = async () => {
            let res = await itemService.getItems({ });

            if(res?.status == C.status.common.ok){
                setGroups(
                    res.data.map(x => ({ value: x.code, label: `${x.value} - ${x.description}`, data: x })),
                    console.log(res.data)
                    );
            }
        }
console.log(fetchData)
    fetchData();
}, []);


    const convertData = response => {

        if(response?.status == C.status.common.ok) {
            let res = response?.data;
            let filterData = res.filter(x => {
                let flag1 = x.model?.group == 'MODEL';
                let flag2 = !selectedGroup || x?.group?.code == selectedGroup?.value;

                return flag1 && flag2;
            });
        
        return filterData.map(x => [
            x.name,
            x.about,
            x.acquisition,
            x.serial,
            x.conditionUse,
            x.lastModified,
        ]);

        }else return[];
    }    
    const getItemInfo = async (row) => {
        console.log(row);

        var res = await itemService.getItem(row[0]);

        if(res?.status === C.status.common.ok){
            setItems(res.data);
        }
    };

    const selectGroup = (value) => {
        setGroup(value);
        setTrigger(val => !val)
    } 
    const columns = [
        {
            name: 'Name',
            selector: row => row[0],
            sortable: true,
        },
        {
            name: 'About',
            selector: row => row[1],
            sortable: true,
        },
        {
            name: 'Acquisition',
            selector: row => row[2],
            sortable: true,
        },
        {
            name: 'Serial',
            selector: row => row[3],
            sortable: true,
        },
        {
            name: 'ConditionUse',
            selector: row => row[4],
            sortable: true,
        },
        {
            name: 'LastModified',
            selector: row => row[4],
            sortable: true,
        },
    ];

    return (
        <div className="mx-4 sm:mx-auto h-auto">
<div className="h-auto text-3xl mb-6">Utilidades</div>

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
            <div className="grid grid-cols-4 gap-4 md:auto-cols-min">
                <div className="col-span-4 rounded-md shadow-md bg-white p-6" >
                    <CustomTable
                        title={'Lista Equipos'}
                        columns={columns}
                        styles={C.styles.dataTable}
                        //onSelectRow={getItemInfo}
                        onHook={async () => await itemService.getItems({})}
                        convertData={convertData}
                        triggerRefresh={trigger}
                    />
                    
                </div>
            </div>
        </div>
    );
};

export default Historical;
