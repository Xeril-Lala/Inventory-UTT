import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import EquipmentForm from './equipmentForm.jsx';
import EquipmentSelected from './equipmentSelected.jsx';
import './equipmentStyle.css';
import UserService from '../../services/User.js';
import HttpBase from '../../services/HttpBase.js';


const Equipment = () => {
    const userService = new UserService();

    const [data, setData] = useState([]);
    const [resource, setResource] = useState('users');
    const [showForm, setShowForm] = useState(true);
    const [showSelected, setShowSelected] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/${resource}`);
                setData(response.data);
            } catch (error) {
                console.error('Error:', error);
            }

        };
        fetchData();
    }, [resource]);

    const abc = () => {
        userService.getUsers({callback: (x) => {

            // Data to Data Table
            // [].map();
            console.log(x);
        }});
    };

    const columns = [
        {
            name: 'Equipo',
            selector: 'name',
            sortable: true,
        },
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '4em', // override the row height
                '&:not(:last-of-type)': {
                    borderBottomStyle: 'solid',
                    borderBottomWidth: '0.5px',
                    borderBottomColor: '#f0f0f0',
                },
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '2em', // override the cell padding for data cells
                paddingRight: '12em',
            },
        },
        header: {
            style: {
                fontSize: '0.8em',
            },
        },
        headRow: {
            style: {
                fontSize: '1.5em',
            },
        },
    };

    const handleRowClick = (row) => {
        setSelectedItem(row);
        setShowForm(false);
        setShowSelected(true);
    };

    const handleBackClick = () => {
        setSelectedItem(null);
        setShowForm(true);
        setShowSelected(false);
    };

    return (
        <div className="w-full h-auto text-3xl">
            <div className="w-full h-auto text-3xl mb-12">Formulario Equipo</div>
            <div className="w-[100%] flex direction-col ml-16 ">
                <div className="w-[100%] flex direction-col">
                    <div className="w-[35%] rounded-md shadow-md bg-white p-10">
                        <DataTable
                            title="Equipos Inventariados"
                            columns={columns}
                            data={data}
                            onRowClicked={handleRowClick}
                            customStyles={customStyles}
                        />
                    </div>
                    <div className="ml-24 w-[50%]">
                        {showForm && <EquipmentForm />}
                        {showSelected && (
                            <div className="bg-white p-12 flex justify-center flex-col items-center rounded-md shadow-md">
                                <button
                                    className="hover:bg-green-500 hover:transition-colors hover:duration-300 active:text-green-700 shadow-md font-mono text-base font-medium bg-red-950 text-white p-2 w-[50%] rounded-md focus:bg-green-300"
                                    onClick={handleBackClick}
                                >
                                    Nuevo Equipo
                                </button>
                                <EquipmentSelected item={selectedItem} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Equipment;
