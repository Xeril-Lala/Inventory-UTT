import { C } from '../../constants/C.js';
import CustomTable from '../customTable/customTable.jsx';
import AssetService from '../../services/Asset.js';
import React, { useState } from 'react';
import '../customTable/customStyle.css';

const Historical = () => {
    const assetService = new AssetService();
    const [asset, setAsset] = useState(null);

    const convertData = response => {
        return response?.data.map(x => [
            x.code,
            x.value,
            x.description,
            x.lastModified,
            //x.isActive,
            x.auditUser,
            x?.group?.value ?? 'NA'
        ]);
    }

    const getAssetInfo = async (row) => {
        console.log(row);

        var res = await assetService.getAsset(row[0]);

        if(res?.status == C.status.common.ok){
            setAsset(res.data);
        }

    };

    const columns = [
        {
            name: 'Codigo',
            selector: row => row[0],
            sortable: true,
        },
        {
            name: 'Ubicacion',
            selector: row => row[1],
            sortable: true,
        },
        {
            name: 'Descripcion',
            selector: row => row[2],
            sortable: true,
        },
        {
            name: 'Fecha de Modificacion',
            selector: row => row[3],
            sortable: true,
        },
        {
            name: 'Auditor',
            selector: row => row[4],
            sortable: true,
        },
    ];

    return (
        <div className="mx-4 sm:mx-auto h-auto">
            <div className="h-auto text-3xl mb-6">Historical</div>

            <div className="grid grid-cols-4 gap-4 md:auto-cols-min">
                <div className="col-span-4 rounded-md shadow-md bg-white p-6" >
                    <CustomTable
                        title={'Lista Equipos'}
                        columns={columns}
                        styles={C.styles.dataTable}
                        onSelectRow={getAssetInfo}
                        onHook={async () => await assetService.getAssets({})}
                        convertData={convertData}
                    />
                    
                </div>
            </div>
        </div>
    );
};

export default Historical;
