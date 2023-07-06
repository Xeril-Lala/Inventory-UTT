import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import './historicalStyle.css';
import UserService from '../../services/User.js';
import HttpBase from '../../services/HttpBase.js';


const Historical = () => {
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
            <div className="w-full h-auto text-3xl mb-12">Historial de los Equipos</div>
            <div className="w-[100%] flex direction-col ml-16 ">
                <div className="w-[100%] flex direction-col">
                    <div className="w-[95%] rounded-md shadow-md bg-white p-10">
                        <DataTable
                            title="Equipos Inventariados"
                            columns={columns}
                            data={data}
                            onRowClicked={handleRowClick}
                            customStyles={customStyles}
                        />
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Historical;
