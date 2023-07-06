import React, { useEffect, useState } from 'react';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';

const EquipmentForm = () => {
    const [isHidden, setIsHidden] = useState(false);
    const handleButtonClick = () => {
        setIsHidden(!isHidden);
    };

    return (
        <div className="bg-white p-12 rounded-md shadow-md">
            <div className="flex justify-center">
                
                <button 
                    className="hover:bg-green-500 hover:transition-colors hover:duration-300 active:text-green-700 rounded p-4 shadow-md font-mono text-base font-medium bg-red-950 text-white  w-[50%]  focus:bg-green-300" 
                    onClick={handleButtonClick}
                >
                    Nuevo Equipo
                </button>
            </div>
                {!isHidden && (
                    <div>
                        {/*<div className="flex direction-col w-[100%] justify-center pt-4 text-2xl">
                            <p>Registro de Nuevo Usuario</p>
                </div>*/}
                    <div className="grid grid-cols-2 gap-4 p-12 text-base font-mono">
                    <div className="col-span-2 row-start-2 flex flex-nowrap flex-col">
                        <p></p>
                        <input
                        type="text"
                        placeholder=""
                        className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>
                    <div className="col-span-2 row-start-3 flex flex-nowrap flex-col">
                        <p></p>
                        <input
                        type="text"
                        
                        placeholder=""
                        className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>
                    <div className="col-span-2 row-start-4 flex flex-nowrap flex-col">
                        <p></p>
                        <input
                        type="number"
                        min="0"
                        placeholder=""
                        className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>
                    <div className="col-span-2 row-start-5 flex flex-nowrap flex-col">
                        <p></p>
                        <input
                        type="text"
                        min="0"
                        placeholder=""
                        className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>
                    <div className="col-span-2 row-start-6 flex flex-nowrap flex-col">
                        <p></p>
                            <input
                            type="text"
                            min="0"
                            placeholder=""
                            className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                        <div className="col-span-2 row-start-7 flex flex-nowrap flex-col">
                            <p></p>
                            <input
                            type="text"
                            min="0"
                            placeholder=""
                            className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                    </div>
            </div>
        )}
        </div>
    );
    };

export default EquipmentForm;