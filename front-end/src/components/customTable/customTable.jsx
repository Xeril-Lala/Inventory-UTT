import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import { FaFileExport, FaSync } from 'react-icons/fa';
import 'react-data-table-component-extensions/dist/index.css';

const CustomTable = ({
    title,
    columns = [],
    styles = {},
    onHook = async () => { },
    convertData = () => { },
    onSelectRow = () => { },
    triggerRefresh
}) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [triggerRefresh]);

    const fetchData = async () => {
        setData([]);
        var data = await onHook();
        data = convertData(data);
        setData(data);
    }


    const actionsMemo = React.useMemo(() => <FaFileExport onClick={() => console.log(data)} />, []);

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
                print={true}
                export={true}
            >
                <DataTable
                    title={title}
                    columns={columns}
                    data={data}
                    onRowClicked={onSelectRow}
                    customStyles={styles}
                    actions={actionsMemo}
                    noHeader
                    pagination
                    highlightOnHover
                />
            </DataTableExtensions>

        </div>
    );
}

export default CustomTable;