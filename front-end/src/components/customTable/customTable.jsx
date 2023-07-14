import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import { FaSync } from 'react-icons/fa';


const CustomTable = ({
    title,
    columns = [], 
    styles = {}, 
    onHook = async () => {},
    convertData = () => {},
    onSelectRow = () => {},
    triggerRefresh
}) => {
    
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [triggerRefresh]);

    const fetchData = async () => {
        var data = await onHook();
        data = convertData(data);
        setData(data);
    }

    return (
        <div className="relative">
            <button
                className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-700 text-white rounded-full p-2"
                onClick={fetchData}
            >
                <FaSync className="text-xl" />
            </button>
            
            
            <DataTableExtensions
                columns={columns}
                data={data}
                exportHeaders={false}
                print={false}
                export={false}
                filterPlaceholder={'Filtrado'}
                filter={true}
                
            >
            <DataTable
                title={title}
                columns={columns}
                data={data}
                onRowClicked={onSelectRow}
                customStyles={styles}
                pagination
                highlightOnHover

            />
        </DataTableExtensions>
            
        </div>
    );
}

export default CustomTable;