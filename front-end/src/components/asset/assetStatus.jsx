import React, { useEffect, useState } from 'react';
import { FiFilter, FiAlertCircle } from 'react-icons/fi';
import { MdLaptop } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { C } from '../../constants/C.js';
import CustomTable from '../customTable/customTable.jsx';
import AssetForm from './assetForm.jsx';
import AssetService from '../../services/Asset.js';
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
                );
                
            }
        }
        fetchData();
    }, []);

    const convertData = response => {
            if (response?.status == C.status.common.ok) {
                let res = response?.data;
                // let filterData = res.filter(x => {
                // let flag1 = x?.group == 'MODEL';
                // let flag2 = !selectedGroup || x?.code == selectedGroup?.value;
                // //let secondFilter = res.filter(flag1 && flag2);
                // return flag1 && flag2;
                // });
                return res.map(x => ({
                    code: x.code,
                    value: x.value,
                    group: x.group,
                    subGroup: x.subGroup,
                    alternativeGroup: x.alternativeGroup,
                    description: x.description,
                    auditUser: x.auditUser,
                    lastModified: formatDate(x?.lastModified, false),
                })
                );
            } else return [];
            
    }


    const getAssetInfo = async (row) => {
        var res = await assetService.getAsset(row.code);

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
            selector: "code",
            wrap: true,
            width: '10%'
            //selector: row => row[0],
            //sortable: true,
        },
        {
            name: 'Nombre',
            selector: "value",
            wrap: true,
            width: '15%'
            //selector: row => row[1],
            //sortable: true,
        },
        // {
        //     name: 'Group',
        //     selector: "group",
        //     width: '7%'
        //     //selector: row => row[2],
        //     //sortable: true,
        // },
        // {
        //     name: 'Sub Grupo',
        //     selector: "subGroup",
        //     width: '10%'
        //     //selector: row => row[3],
        //     //sortable: true,
        // },
        // {
        //     name: 'Grupo Alternativo',
        //     selector: "alternativeGroup",
        //     width: '15%'
        //     //selector: row => row[4],
        //     //sortable: true,
        // },
        {
            name: 'Ultima Actualizacion',
            selector: "lastModified",
            wrap: true,
            width: '17%'
        },
        {
            name: 'Auditor',
            selector: "auditUser",
            wrap: true,
            width: '8%'
        },
        {
            name: 'Descripcion',
            selector: 'description',
            wrap: true,
            width: '25%'
        },

    ];

    return (
        <div className="mx-4 sm:mx-auto h-auto">


            {/* <div className="grid grid-cols-6 ga rounded-md shadow-md bg-white p-2 my-2">
                <Select 
                    className="col-span-3" 
                    value={selectedGroup}
                    options={groups}
                    onChange={selectGroup}
                    isClearable
                    isSearchable
                    placeholder="Filtrar por Rol o Grupo"
                />
            </div> */}

            <div className="grid grid-cols-6 gap-4 md:auto-cols-min">
                <div className="col-span-4 rounded-md shadow-md bg-white p-6" >
                    <h1 className="text-2xl">Utilidades</h1>
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
                    <div className="h-auto text-center text-xl">Añadir/Modificar un Elemento</div>
                    <AssetForm
                        asset={asset}
                        updateAssetCallback={ asset => {
                            setAsset(asset);
                            setTrigger(val => !val)
                        }}/>
                    {/* <div>
                        <p>Subir Archivo de Inventario</p>
                        <AssetExcel/>
                    </div> */}
                </div>

            </div>
        </div>
    );
};

export default Assets;