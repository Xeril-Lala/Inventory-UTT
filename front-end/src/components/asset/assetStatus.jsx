import react from 'react';
import { FiFilter, FiAlertCircle } from 'react-icons/fi';
import { MdLaptop } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { C } from '../../constants/C.js';
import CustomTable from '../customTable/customTable.jsx';
import AssetForm from './assetForm.jsx';
import UserService from '../../services/User.js';
import AssetService from '../../services/Asset.js';
import React, { useState } from 'react';
import AssetExcel from './assetExcel.jsx';
import '../customTable/customStyle.css';
import DataTableExtensions from "react-data-table-component-extensions";

const Assets = () => {
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
            name: 'Nombre',
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
            <div className="h-auto text-3xl mb-6">Utilidades</div>

            <div className="grid grid-cols-6 gap-4 md:auto-cols-min">
                <div className="col-span-4 rounded-md shadow-md bg-white p-6" >
                    {/* <CustomTable
                        title={'Lista Items'}
                        columns={columns}
                        styles={C.styles.dataTable}
                        onSelectRow={() =>{}}
                        onHook={async () => await service({})}
                        convertData={convertData}
                    /> */}
                    
                    <CustomTable
                        title={'Lista Utilidades'}
                        columns={columns}
                        styles={C.styles.dataTable}
                        onSelectRow={getAssetInfo}
                        onHook={async () => await assetService.getAssets({})}
                        convertData={convertData}
                    />
                    

                    
                </div>

                <div className="col-span-2 rounded-md shadow-md bg-white p-6">
                    <div className="h-auto text-center text-xl">Equipo</div>

                    {/* <InventoryForm 
                        item={item}
                        updateCallback={ item => {
                        }}
                    /> */}
                    <AssetForm
                        asset={asset}
                        updateAssetCallback={ asset => {
                            setAsset(asset);
                        }}/>
                    <div>
                        <p>Subir Archivo de Inventario</p>
                        <AssetExcel/>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Assets;

/*
        <div>
            <div className="grid grid-cols-5 grid-rows-2 gap-4 w-full h-auto">
                <div className="col-span-2 w-full h-auto text-3xl">Inventario</div>
                <div className="col-span-2 col-start-5 bg-white border-r-2 rounded-md shadow-md w-72 h-auto flex flex-nowrap right-0 p-1">
                    <FiFilter class="m-1 text-gray-400" />
                    <input type="text" placeholder="Buscar" class="font-mono antialiased font-thin text-sm outline-none "></input>
                </div>
            </div>
            <div className="col-span-5 row-span-2 row-start-2 bg-white rounded-md shadow-md w-full h-auto text-xl font-mono antialiased font-light tracking-normal break-normal">
                <div className="grid grid-cols-5 grid-rows-4 gap-1 p-2 border-l-8 border-red-500 rounded-md">
                    <div className="row-span-4 pl-4 border-r-2 border-slate-100">
                        <MdLaptop className="text-6xl ml-24" />
                        <div className="col-start-1 row-start-4 flex mt-5 ml-10">
                            <RxCrossCircled class="text-3xl mr-2 text-red-600" />
                            <a>No Disponible</a>
                        </div>
                    </div>
                    <div className="col-start-2 row-start-1 row-span-4 ml-2">
                        <div className="">ID</div>
                        <div className="">RUBRO</div>
                        <div className="">MARCA </div>
                        <div className="">SERIAL</div>
                    </div>
                    <div className="row-span-4 col-start-5 row-start-1">
                        <div className="">AREA RESGUARDO</div>
                        <div className="">UBICACION</div>
                    </div>
                    <div className="row-span-4 col-start-3 col-span-2 row-start-1 text-xl font-mono antialiased font-light tracking-normal break-normal">DESCRIPCION</div>
                </div>
            </div>
        </div>
*/