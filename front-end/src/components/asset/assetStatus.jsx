import React, { useEffect, useState } from 'react';
import { FiFilter, FiAlertCircle } from 'react-icons/fi';
import { MdLaptop } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { C } from '../../constants/C.js';
import CustomTable from '../customTable/customTable.jsx';
import AssetForm from './assetForm.jsx';
import AssetService from '../../services/Asset.js';
import AssetExcel from './assetExcel.jsx';
import '../customTable/customStyle.css';
import DataTableExtensions from "react-data-table-component-extensions";
import Select from 'react-select';
import { formatDate } from '../../constants/utils.js';


const Assets = () => {
    const assetService = new AssetService();

    const [asset, setAsset] = useState(null);
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setGroup] = useState(null);
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let res = await assetService.getAssets({ group: 'MODEL'});

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
                let flag1 = x?.group == 'MODEL';
                let flag2 = !selectedGroup || x?.code == selectedGroup?.value;
            
                return flag1 && flag2;
                });
                return filterData.map(x => [
                x.code,
                x.value,
                x.description,
                formatDate(x?.lastModified),
                x.auditUser,
                x?.group?.value ?? 'NA'
                ]);
            } else return [];
            
    }
    console.log(convertData());

    const getAssetInfo = async (row) => {
        console.log(row);

        var res = await assetService.getAsset(row[0]);

        if(res?.status == C.status.common.ok){
            setAsset(res.data);
        }
    };

    const selectGroup = (value) => {
        setGroup(value);
        setTrigger(val => !val)
    } 
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
                        title={'Lista Utilidades'}
                        columns={columns}
                        styles={C.styles.dataTable}
                        onSelectRow={getAssetInfo}
                        onHook={async () => await assetService.getAssets({})}
                        convertData={convertData}
                        triggerRefresh={trigger}
                    />
                </div>

                <div className="col-span-2 rounded-md shadow-md bg-white p-6">
                    <div className="h-auto text-center text-xl">Equipo</div>
                    <AssetForm
                        asset={asset}
                        updateAssetCallback={ asset => {
                            setAsset(asset);
                            setTrigger(val => !val)
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