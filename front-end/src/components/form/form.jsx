import react from 'react';



const Form = () => {


return (



    
<div className="grid grid-cols-5 grid-rows-6 gap-4 bg-white rounded-md m-3 p-10 text-base font-mono shadow-md">
    <div className="col-span-5 text-2xl">
        Formulario de Solicitud de Equipo
    </div>
    
    <div className="col-start-4 row-start-2 flex flex-nowrap flex-col">
        Fecha
        <input type="date" placeholder="today" className=" bg-gray-100 rounded-md p-2"/>
    </div>
    
    <div className="col-start-5 row-start-2 flex flex-nowrap flex-col">
        Hora
        <input type="text" placeholder="1:00 pm" className=" bg-gray-100 rounded-md p-2"/>
    </div>
    
    <div className="col-span-3 col-start-1 row-start-2 flex flex-nowrap flex-col">
        Nombre del Solicitante
        <input type="text" placeholder="Humberto Martinez Rosas" className=" bg-gray-100 rounded-md p-2"/>
    </div>

    <div className="col-span-3 row-start-3 flex flex-nowrap flex-col">
        Matricula o Numero de Empleado
        <input type="text" placeholder="1234567891" className=" bg-gray-100 rounded-md p-2"/>
    </div>

    <div className="col-start-4 row-start-3 flex flex-nowrap flex-col">
        Turno
        <input type="text" placeholder="Vespertino" className=" bg-gray-100 rounded-md p-2"/>
    </div>

    <div className="col-start-5 row-start-3 flex flex-nowrap flex-col">
        Grado y Grupo
        <input type="text" placeholder="10 A" className=" bg-gray-100 rounded-md p-2"/>
    </div>

    <div className="col-span-5 row-span-2 row-start-4  flex flex-nowrap flex-col h-full">
        Descripcion 
        <div class="flex justify-left items-center  bg-white">
            <textarea placeholder="Equipos y/o Material solicitados" class="p-2 focus:outline-1 focus:outline-blue-500 font-bold border-[0.1px] resize-none h-[120px] border-[#9EA5B1] rounded-md w-full"></textarea>
        </div>
    </div>

    <div className="col-span-1 row-start-6 flex flex-nowrap flex-col">
        Authoriza
        <input type="text" placeholder="Juan Perez Lopez" className=" bg-gray-100 rounded-md p-2"/>
    </div>

    <div className="col-span-1 row-start-6 flex flex-nowrap flex-col">
        Solicitante
        <input type="text" placeholder="Humberto Martinez Rosas" className=" bg-gray-100 rounded-md p-2"/>
    </div>

    <div className="col-start-5 row-start-6 flex flex-nowrap flex-col mt-4">
        <button class="bg-pink-darkest rounded p-4 shadow-md font-mono text-base font-medium bg-red-950 text-white">Completar</button>
    </div>

</div>
    
);
};

export default Form;