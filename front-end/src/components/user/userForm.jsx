import React, { useEffect, useState } from 'react';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';

const UserForm = () => {
    const [isHidden, setIsHidden] = useState(false);
    const handleButtonClick = () => {
        setIsHidden(!isHidden);
    };

    return (
        <div className="bg-white p-12 rounded-md shadow-md">
            <div className="flex justify-center">
                
                <button 
                    className="hover:bg-green-500 hover:transition-colors hover:duration-300 bg-slate-900 text-white p-2 text-base w-[50%] rounded-md shadow-md" 
                    onClick={handleButtonClick}
                >
                    Nuevo Usuario
                </button>
            </div>
                {!isHidden && (
                    <div>
                        {/*<div className="flex direction-col w-[100%] justify-center pt-4 text-2xl">
                            <p>Registro de Nuevo Usuario</p>
                </div>*/}
                    <div className="grid grid-cols-2 gap-4 p-12 text-base font-mono">
                    <div className="col-span-2 row-start-2 flex flex-nowrap flex-col">
                        <p>Nombre(s)</p>
                        <input
                        type="text"
                        placeholder="Nombre"
                        className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>
                    <div className="col-span-2 row-start-3 flex flex-nowrap flex-col">
                        <p>Apellido(s)</p>
                        <input
                        type="text"
                        
                        placeholder="Apellido"
                        className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>
                    <div className="col-span-2 row-start-4 flex flex-nowrap flex-col">
                        <p>Matricula/Numero de Empleado</p>
                        <input
                        type="number"
                        min="0"
                        placeholder="Matricula/Numero de Empleado"
                        className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>
                    <div className="col-span-2 row-start-5 flex flex-nowrap flex-col">
                        <p>Turno</p>
                        <input
                        type="text"
                        min="0"
                        placeholder="Turno"
                        className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>
                    <div className="col-span-2 row-start-6 flex flex-nowrap flex-col">
                        <p>Grupo</p>
                            <input
                            type="text"
                            min="0"
                            placeholder="Grupo"
                            className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                        <div className="col-span-2 row-start-7 flex flex-nowrap flex-col">
                            <p>Correo Electronico</p>
                            <input
                            type="text"
                            min="0"
                            placeholder="Correo Electronico"
                            className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                    </div>
            </div>
        )}
        </div>
    );
    };

export default UserForm;