import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import UserForm from './userForm.jsx';
import UserSelected from './userSelected.jsx';

    const UserSingUp = () => {
        const [data, setData] = useState([]);
        const [resource, setResource] = useState('users');
        const [showForm, setShowForm] = useState(true);
        const [showSelected, setShowSelected] = useState(false);
        const [selectedItem, setSelectedItem] = useState(null);
        //const [choosedItem, setChoosedItem] = useState(null);
    
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
    
        const columns = [
        {
            name: 'Nombre',
            selector: 'name',
            sortable: true,
        },
    ];

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
            <div className="w-full h-auto text-3xl mb-12">
                Formulario usuario
            </div>
            <div className="w-[100%] flex direction-col">
                <div className="w-[100%] flex direction-col">
                    <div className="w-[30%]">
                        {showForm && <UserForm/>}
                        {showSelected && (
                        <>
                                    <button className="hover:bg-green-500 hover:transition-colors hover:duration-300 bg-slate-900 text-white p-3 text-base font-mono w-full"  
                                    onClick={handleBackClick}>
                                        Nuevo Usuario
                                    </button>
                            <UserSelected item={selectedItem} />
                        </>
                        )}
                        <DataTable
                        title="Usuarios Registrados"
                        columns={columns}
                        data={data}
                        onRowClicked={handleRowClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
    };

export default UserSingUp;
