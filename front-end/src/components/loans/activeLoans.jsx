import react from 'react';
import { FiFilter, FiAlertCircle } from 'react-icons/fi';
import { MdLaptop } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { BsClipboard2Check, BsClipboardX, BsClipboardMinus, BsClipboard } from 'react-icons/bs'

const ActiveLoans = () => {

    return( 

        
        <div className="text-xl">
            <div className=" w-full h-auto">
                Prestamos Activos
            </div>
    <div className="bg-white p-6 rounded-md shadow-md mt-12 text-xl">  
        <div className="grid grid-cols-4 grid-rows-4 gap-4">
            
            <div className="row-span-3 flex">
                <a className="m-24">Prestamo en Curso <BsClipboard2Check/></a>
            </div>
            
            <div className="col-span-2">Pedro Iness de la Cruz</div>
            <div className="col-span-2 col-start-2 row-start-3">Laboratorista 1</div>
            <div className="col-start-4 row-start-1">hora y fecha del prestamo</div>
            <div className="col-start-4 row-start-3">Equipos Tomados</div>
            <div className="col-span-4 col-start-1 row-start-4">

            <button class="bg-rose-950 rounded p-4 shadow-md font-mono text-xl font-normal text-white w-full ">Finalizar Prestamo</button>

            </div>
        </div>
    </div>
    </div>
 
    );
};

export default ActiveLoans;