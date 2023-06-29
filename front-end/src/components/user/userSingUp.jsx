import react from 'react';



const UserSingUp = () => {


return (



    
<div class="w-full h-auto text-3xl">
    <div class="w-full h-auto text-3xl mb-12">
        Formulario para alta de nuevo usuario
    </div>
<div className="grid grid-cols-2  gap-4 bg-white rounded-md m-3 p-10 w-[80%] text-base font-mono shadow-md">

    <div className="col-span-2 row-start-2 flex flex-nowrap flex-col">
        Nombre Completo
            <input type="text" placeholder="aaaaa"/>
    </div>
    <div className="col-span-2 row-start-3">
        <input type="number" min="0" placeholder="Matricula o Numero de Empleado" class="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
    </div>
    <div className="col-span-2 row-start-4"><input type="text" placeholder="Nombre Completo"></input></div>
    <div className="col-span-2 row-start-5"><input type="text" placeholder="Nombre Completo"></input></div>
    <div className="col-span-2 row-start-6"><input type="text" placeholder="Nombre Completo"></input></div>
</div>
    </div>
    
);
};

export default UserSingUp;