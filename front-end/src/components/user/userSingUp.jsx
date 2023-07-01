import react from 'react'
import DataTable from 'react-data-table-component';

const UserSingUp = (props) => {
    console.log(props)

    const [ usersTest ] =  props;
    const columns = [
        {
            name: 'Nombre',
            selector: row => row.title,
            sortable: true,
        },
    ];
return (



    
<div className="w-full h-auto text-3xl">
    <div className="w-full h-auto text-3xl mb-12">
        Formulario para alta de nuevo usuario
    </div>

    <div className="w-[100%] flex direction-col">

        <div className="w-[60%] bg-red-300">
    

        <div className="grid grid-cols-2  gap-4 bg-white rounded-md m-3 p-10 w-[40%] text-base font-mono shadow-md">
            <div className="col-span-2 row-start-2 flex flex-nowrap flex-col">
                Nombre(s)
                <input type="number" min="0" placeholder="Matricula o Numero de Empleado" class="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
            </div>
            <div className="col-span-2 row-start-3  flex flex-nowrap flex-col">
                Apellido(s)
                <input type="number" min="0" placeholder="Matricula o Numero de Empleado" class="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
            </div>
            <div className="col-span-2 row-start-4  flex flex-nowrap flex-col">
                Matricula/Numero de Empleado
                <input type="number" min="0" placeholder="Matricula o Numero de Empleado" class="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
            </div>
            <div className="col-span-2 row-start-5  flex flex-nowrap flex-col">
                Turno
                <input type="number" min="0" placeholder="Matricula o Numero de Empleado" class="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
            </div>
            <div className="col-span-2 row-start-6  flex flex-nowrap flex-col">
                Grupo
                <input type="number" min="0" placeholder="Matricula o Numero de Empleado" class="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
            </div>
        </div>
    </div>

</div>
    
);
};

export default UserSingUp;