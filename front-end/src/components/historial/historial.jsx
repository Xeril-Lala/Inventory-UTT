import react from 'react';
import { FiFilter, FiAlertCircle } from 'react-icons/fi';
import { MdLaptop } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
const Historial = () => {



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
                

                <div className="grid grid-cols-5 grid-rows-4 gap-1 p-2  border-l-8 border-red-500">
                    <div className="row-span-3 justify-self-left text-6xl ml-20 p-7">
                    <MdLaptop/>
                    </div>
                    <div className="col-start-1 row-start-4 justify-self-left ml-14 flex "><RxCrossCircled class ="text-3xl mr-2 text-red-600"/><a>No Disponible</a></div>
                    <div className="col-start-2 row-start-1 text-xl font-mono antialiased font-light tracking-normal break-normal">ID</div>
                    <div className="col-start-2 row-start-2 text-xl font-mono antialiased font-light tracking-normal break-normal">RUBRO</div>
                    <div className="col-start-2 row-start-3 text-xl font-mono antialiased font-light tracking-normal break-normal">MARCA + MODELO</div>
                    <div className="col-start-2 row-start-4 text-xl font-mono antialiased font-light tracking-normal break-normal">SERIAL</div>
                    <div className="row-span-4 col-start-3 row-start-1 text-xl font-mono antialiased font-light tracking-normal break-normal">DESCRIPCION</div>
                    <div className="row-span-4 col-start-4 row-start-1 text-xl font-mono antialiased font-light tracking-normal break-normal">AREA RESGUARDO</div>
                    <div className="row-span-4 col-start-5 row-start-1 text-xl font-mono antialiased font-light tracking-normal break-normal">UBICACION</div>
                </div>
            
    </div>
    </div>
);
};

export default Historial;