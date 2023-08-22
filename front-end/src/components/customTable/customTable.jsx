// Importar los módulos y componentes necesarios desde las bibliotecas y archivos locales
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import { FaFileExport, FaSync } from 'react-icons/fa';
import 'react-data-table-component-extensions/dist/index.css';
import '../customTable/customStyle.css';

// Definir el componente de tabla personalizada
const CustomTable = ({
    title,              // Título de la tabla
    columns = [],       // Columnas de la tabla
    styles = {},        // Estilos personalizados
    onHook = async () => { },   // Función para obtener datos
    convertData = () => { },    // Función para convertir datos
    onSelectRow = () => { },    // Función para manejar selección de fila
    triggerRefresh         // Disparador de actualización
}) => {
    // Estado para almacenar los datos de la tabla
    const [data, setData] = useState([]);

    // Obtener datos al cargar el componente o cuando triggerRefresh cambie
    useEffect(() => {
        fetchData();
    }, [triggerRefresh]);

    // Obtener y convertir los datos utilizando la función onHook y convertData
    const fetchData = async () => {
        setData([]); // Limpiar los datos anteriores
        var data = await onHook(); // Obtener datos utilizando la función onHook
        data = convertData(data); // Convertir datos utilizando la función convertData
        setData(data); // Establecer los datos en el estado
    }

    // Icono de exportación de datos
    const actionsMemo = React.useMemo(() => <FaFileExport onClick={() => console.log(data)} />, []);

    // Renderizar el componente de tabla personalizada
    return (
        <div className="relative">
            {/* Botón para refrescar los datos */}
            <button
                className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-700 text-white rounded-full p-2"
                onClick={fetchData}
            >
                <FaSync className="text-xl" />
            </button>

            {/* Componente de extensión de tabla para imprimir y exportar */}
            <DataTableExtensions
                columns={columns}
                data={data}
                print={true}
                export={true}
                filterPlaceholder={'Buscar'}
                filter={true}
            >
                {/* Tabla de datos */}
                <DataTable
                    responsive
                    striped
                    title={title}
                    columns={columns}
                    data={data}
                    onRowClicked={onSelectRow}
                    actions={actionsMemo}
                    noHeader
                    pagination
                    highlightOnHover
                    customStyles={styles} // Estilos personalizados
                />
            </DataTableExtensions>
        </div>
    );
}

// Exportar el componente para su uso en otros módulos
export default CustomTable;