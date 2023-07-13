import { C } from '../../constants/C.js';
import CustomTable from '../customTable/customTable.jsx';
import InventoryService from '../../services/Inventory.js';
import React, { useState } from 'react';
import '../customTable/customStyle.css';

const Historical = () => {
    const itemService = new InventoryService();
    const [items, setItems] = useState(null);

    const convertData = response => {
        return response?.data.map(x => [
            x.name,
            x.about,
            x.acquisition,
            x.serial,
            x.conditionUse,
            x.lastModified,
        ]);
    }

    // const getItemInfo = async (row) => {
    //     console.log(row);
    //     var res = await itemService.getItem(row[0]);
    //     if(res?.status == C.status.common.ok){
    //         setItems(res.data);
    //     }
    // };

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
            <div className="h-auto text-3xl mb-6">Historicos</div>
            <div className="grid grid-cols-4 gap-4 md:auto-cols-min">
                <div className="col-span-4 rounded-md shadow-md bg-white p-6" >
                    <CustomTable
                        title={'Lista Equipos'}
                        columns={columns}
                        styles={C.styles.dataTable}
                        //onSelectRow={getItemInfo}
                        onHook={async () => await itemService.getItems({})}
                        convertData={convertData}
                    />
                    
                </div>
            </div>
        </div>
    );
};

export default Historical;
