import react from 'react';
import { FiFilter, FiAlertCircle } from 'react-icons/fi';
import { MdLaptop } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
const Historical = () => {



return (
<div>
    <div className="grid grid-cols-5 grid-rows-2 gap-4 w-full h-auto huetest">
        <div className="col-span-2 w-full h-auto text-3xl">Historial</div>

        <div className="col-span-2 col-start-5 bg-white border-r-2 rounded-md shadow-md w-72 h-auto flex flex-nowrap right-0 p-1">
                <FiFilter class="m-1 text-gray-400"/> 
                <input type="text" placeholder="Buscar" class="font-mono antialiased font-thin text-sm outline-none "></input>
        </div>
    
            
        
        </div>
            <div className="col-span-5 row-span-2 row-start-2 bg-white rounded-md shadow-md w-full h-auto text-xl font-mono antialiased font-light tracking-normal break-normal">
                    

                    <div className="grid grid-cols-5 grid-rows-4 gap-1 p-2 border-l-8 border-red-500 rounded-md">
                        <div className="row-span-4 pl-4 border-r-2 border-slate-100">
                            <MdLaptop className="text-6xl ml-24"/>
                                <div className="col-start-1 row-start-4 flex mt-5 ml-10"> 
                                    <RxCrossCircled class ="text-3xl mr-2 text-red-600"/> 
                                    <a>No Disponible</a>
                                </div>
                        </div>

                        <div className="col-start-2 row-start-1 row-span-4 ml-2">
                            <div className="">ID</div>
                            <div className="">RUBRO</div>
                            <div className="">MARCA </div>
                            <div className="">SERIAL</div>
                        </div>

                        <div className="row-span-4 col-start-5 row-start-1">
                            <div className="">AREA RESGUARDO</div>
                            <div className="">UBICACION</div>
                        </div>

                        <div className="row-span-4 col-start-3 col-span-2 row-start-1 text-xl font-mono antialiased font-light tracking-normal break-normal">DESCRIPCION</div>
                    </div>
            
    </div>
</div> 



);
};

export default Historical;