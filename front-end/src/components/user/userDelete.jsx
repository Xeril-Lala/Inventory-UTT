import React, { useEffect, useState } from 'react';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';

    const DeleteUser = () => {
    const [isHidden, setIsHidden] = useState(false);
    const handleButtonClick = () => {
        setIsHidden(!isHidden);
    };

    return (
        <div className="">
        <button 
            className="hover:bg-green-500 hover:transition-colors hover:duration-300 bg-slate-900 text-white p-3 text-base font-mono w-full" 
            onClick={handleButtonClick}
            >Borrar Usuario
        </button>
        {!isHidden && (
            <div className="grid grid-cols-2 gap-4 bg-white rounded-md m-3 p-10 text-base font-mono shadow-md">
                <div className="col-span-2 row-start-2 flex flex-nowrap flex-col">
                    Nombre(s)
                    <input
                    type="number"
                    min="0"
                    placeholder="Matricula o Numero de Empleado"
                    className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>
                <div className="col-span-2 row-start-3 flex flex-nowrap flex-col">
                    Apellido(s)
                    <input
                    type="number"
                    min="0"
                    placeholder="Matricula o Numero de Empleado"
                    className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>
                <div className="col-span-2 row-start-4 flex flex-nowrap flex-col">
                    Matricula/Numero de Empleado
                    <input
                    type="number"
                    min="0"
                    placeholder="Matricula o Numero de Empleado"
                    className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>
                <div className="col-span-2 row-start-5 flex flex-nowrap flex-col">
                    Turno
                    <input
                    type="number"
                    min="0"
                    placeholder="Matricula o Numero de Empleado"
                    className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>
                <div className="col-span-2 row-start-6 flex flex-nowrap flex-col">
                    Grupo
                    <input
                    type="number"
                    min="0"
                    placeholder="Matricula o Numero de Empleado"
                    className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>
            </div>
        )}
        </div>
    );
    };

export default DeleteUser;