import react from 'react';
import { FiFilter, FiAlertCircle } from 'react-icons/fi';
import { MdLaptop } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { BsClipboard2Check, BsClipboardX, BsClipboardMinus, BsClipboard } from 'react-icons/bs'
import { GrUserManager, GrUserAdmin, GrUser } from 'react-icons/gr';
import { FauserAlt, FaUserLock, FaUser, FaUserUsers, FaClipboardList, FaLaptopCode, FaLaptop, FaCalendarAlt} from 'react-icons/fa';

const ActiveLoans = () => {

    return( 
        
        <div className="text-xl ">
            <div className=" w-full h-auto text-3xl">
                Prestamos Activos
            </div>
                <div className="bg-white p-6 rounded-md shadow-md mt-12 text-xl flex justify-center border-l-8 border-green-500">  
                    <div className="grid grid-cols-2 grid-rows-4 gap-1 h-48 w-full">
                        
                        {/* <div className="row-span-3 w-24 flex ml-16 mt-8 ">
                            <a className=" text-8xl text-green-500">
                                <BsClipboard2Check/>
                            </a>
                        </div> */}
                        
                        <div className="col-start-1 row-start-1 flex flex-row ml-60">
                            <FaUser className="text-2xl"/>
                            <div className="ml-2">
                                Pedro Iness de la Cruz
                            </div>
                        </div>

                        <div className="col-start-1 row-start-2 flex flex-row ml-60">
                            <FaUserLock className="text-3xl"/>
                            <div className="mt-1 ml-2">
                                Laboratorista 1
                            </div>
                        </div>

                        <div className="col-start-1 row-start-3 flex flex-row ml-60">
                            <FaCalendarAlt className="text-2xl"/>
                            <div className="ml-2">
                                Hora y Fecha del Prestamo
                            </div>
                        </div>

                        <div className="row-span-3 col-start-2 row-start-1 flex flex-row ml-32">
                            <FaClipboardList className="text-4xl"/>
                            <div className="ml-2 mt-1">Equipos Prestados</div>
                        </div>

                        <div className="col-span-2 row-start-4 flex justify-center w-full h-full ">
                        <button class="bg-rose-950 rounded m-2  p-1 shadow-md font-mono text-xl font-normal text-white w-[75%] h-full  ">Finalizar Prestamo</button>
                        </div>

                    </div>
                </div>
        </div>
    );
};

export default ActiveLoans;