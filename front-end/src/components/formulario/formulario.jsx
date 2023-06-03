import react from 'react';



const Formulario = () => {


return (



    
<div className="grid grid-cols-5 grid-rows-6 gap-4 bg-white rounded-md m-3 p-10">
    <div className="col-span-5">Presentacion</div>
    <div className="col-start-4 row-start-2">Fecha</div>
    <div className="col-start-5 row-start-2">Hora</div>
    <div className="col-span-3 col-start-1 row-start-2">Nombre del Solicitante</div>
    <div className="col-span-3 row-start-3">Matricula o numero</div>
    <div className="col-start-4 row-start-3">Turno</div>
    <div className="col-start-5 row-start-3">Grado</div>
    <div className="col-span-5 row-start-4">Descripcion</div>
    <div className="col-span-2 row-start-5">Quien Authoriza</div>
    <div className="col-span-2 row-start-6">Solicitante</div>
    <div className="col-start-4 row-start-6">Boton de Completar</div>
</div>
    
);
};

export default Formulario;