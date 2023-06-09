import react from 'react';
import { FiFilter, FiAlertCircle } from 'react-icons/fi';
import { MdLaptop } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";

const ActiveLoans = () => {

    return( 

        
        <div className="text-xl">
            <div className=" w-full h-auto">
                Prestamos Activos
            </div>
    <div className="bg-white p-10 rounded-md shadow-md text-base mt-12 text-xl">  
        <div className="grid grid-cols-4 grid-rows-4 gap-4">
            
            <div className="row-span-3">Status</div>
            <div className="col-span-2">Solicitante</div>
            <div className="col-span-2 col-start-2 row-start-3">Quien Authorizo</div>
            <div className="col-start-4 row-start-1">hora y fecha del prestamo</div>
            <div className="col-start-4 row-start-3">Equipos Tomados</div>
            <div className="col-span-4 col-start-1 row-start-4">Boton</div>
        </div>
    </div>
    </div>
 
    );
};

export default ActiveLoans;