import React, { useState } from 'react';

const MyForm = () => {
  const [responsable, setResponsable] = useState('');
  const [responsableID, setResponsableID] = useState('');
  const [responsableContact, setResponsableContact] = useState('');
  const [loanType, setLoanType] = useState('');
  const [objectItem, setObjectItem] = useState('');
  const [objectItemList, setObjectItemList] = useState([]);
  const [comments, setComments] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted!');
    console.log('Responsable:', responsable);
    console.log('Responsable ID:', responsableID);
    console.log('Responsable Contact:', responsableContact);
    console.log('Loan Type:', loanType);
    console.log('Object/Item:', objectItem);
    console.log('Object/Item List:', objectItemList);
  };

  const handleAddObjectItem = () => {
    // Add the selected object/item to the objectItemList
    setObjectItemList([...objectItemList, objectItem]);
    setObjectItem('');
  };

  const handleRemoveObjectItem = (index) => {
    // Remove the object/item at the specified index from the objectItemList
    const updatedList = [...objectItemList];
    updatedList.splice(index, 1);
    setObjectItemList(updatedList);
  };

  return (
    <>
        <div className="w-[50%] mr-auto bg-white shadow-md p-6">
            <h2 className="text-2xl mb-4">Crear Prestamo</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                <label htmlFor="responsable" className="block mb-1 font-bold">Responsable</label>
                <input
                    type="text"
                    id="responsable"
                    className="w-full bg-gray-100 rounded-md p-2"
                    value={responsable}
                    onChange={(e) => setResponsable(e.target.value)}
                />
                </div>
                <div className="mb-4">
                <label htmlFor="responsableID" className="block mb-1 font-bold">Responsable ID</label>
                <input
                    type="text"
                    id="responsableID"
                    className="w-full bg-gray-100 rounded-md p-2"
                    value={responsableID}
                    onChange={(e) => setResponsableID(e.target.value)}
                />
                </div>
                <div className="mb-4">
                <label htmlFor="responsableContact" className="block mb-1 font-bold">Responsable Contact</label>
                <input
                    type="text"
                    id="responsableContact"
                    className="w-full bg-gray-100 rounded-md p-2"
                    value={responsableContact}
                    onChange={(e) => setResponsableContact(e.target.value)}
                />
                </div>
                <div className="mb-4">
                    <label htmlFor="comments" className="block mb-1 font-bold">
                        Comentarios
                    </label>
                    <textarea
                        id="comments"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        className="w-full bg-gray-100 rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                <label htmlFor="loanType" className="block mb-1 font-bold">Tipo de Préstamo</label>
                <select
                    id="loanType"
                    className="w-full bg-gray-100 rounded-md p-2"
                    value={loanType}
                    onChange={(e) => setLoanType(e.target.value)}
                >
                    <option value="">Seleccione un tipo</option>
                    <option value="Tipo 1">Tipo 1</option>
                    <option value="Tipo 2">Tipo 2</option>
                    <option value="Tipo 3">Tipo 3</option>
                </select>
                </div>
                <div className="mb-4">
                <label htmlFor="objectItem" className="block mb-1 font-bold">Objeto/Item</label>
                <input
                    type="text"
                    id="objectItem"
                    className="w-full bg-gray-100 rounded-md p-2"
                    value={objectItem}
                    onChange={(e) => setObjectItem(e.target.value)}
                />
                </div>
                <button
                type="button"
                className="bg-blue-500 text-white rounded-md px-4 py-2"
                onClick={handleAddObjectItem}
                >
                Agregar Objeto/Item
                </button>
                <h3 className="text-xl mt-4 mb-2">Lista de Objeto/Item</h3>
                <ul className="bg-gray-100 rounded-md p-2">
                {objectItemList.map((item, index) => (
                    <li key={index} className="flex justify-between items-center mb-2">
                    <span>{item}</span>
                    <button
                        type="button"
                        className="bg-red-500 text-white rounded-md px-2 py-1"
                        onClick={() => handleRemoveObjectItem(index)}
                    >
                        Eliminar
                    </button>
                    </li>
                ))}
                </ul>
                <button type="submit" className="bg-green-500 text-white rounded-md px-4 py-2 mt-4">
                Enviar
                </button>
            </form>
        </div>
        {/* <div className="w-[50%] mr-auto bg-white shadow-md p-6">
            <h1>ABC</h1>
        </div> */}
    </>
  );
};

export default MyForm;

// <div class="w-full h-auto text-3xl">
//     <div class="w-full h-auto text-3xl mb-12">
//         Formulario de Solicitud de Equipo
//     </div>
//     <div className="grid grid-cols-5 gap-4 bg-white rounded-md m-3 px-10 pb-10 pt-6 text-base font-mono shadow-md">
//         <div className="col-start-4 row-start-2 flex flex-nowrap flex-col">
//             Fecha
//             <input type="date" placeholder="today" className=" bg-gray-100 rounded-md p-2" />
//         </div>

//         <div className="col-start-5 row-start-2 flex flex-nowrap flex-col">
//             Hora
//             <input type="text" placeholder="1:00 pm" className=" bg-gray-100 rounded-md p-2" />
//         </div>

//         <div className="col-span-3 col-start-1 row-start-2 flex flex-nowrap flex-col">
//             Nombre del Solicitante
//             <input type="text" placeholder="Humberto Martinez Rosas" className=" bg-gray-100 rounded-md p-2" />
//         </div>

//         <div className="col-span-3 row-start-3 flex flex-nowrap flex-col">
//             Matricula o Numero de Empleado
//             <input type="number" min="0" placeholder="1234567891" class="[appearance:textfield] bg-gray-100 rounded-md p-2 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"></input>
//         </div>

//         <div className="col-start-4 row-start-3 flex flex-nowrap flex-col">
//             Turno
//             <input type="text" placeholder="Vespertino" className=" bg-gray-100 rounded-md p-2" />
//         </div>

//         <div className="col-start-5 row-start-3 flex flex-nowrap flex-col">
//             Grado y Grupo
//             <input type="text" placeholder="10 A" className=" bg-gray-100 rounded-md p-2" />
//         </div>

//         <div className="col-span-5 row-span-2 row-start-4  flex flex-nowrap flex-col h-full">
//             Descripcion
//             <div class="flex justify-left items-center  bg-white">
//                 <textarea placeholder="Equipos y/o Material solicitados" class="p-2 focus:outline-1 focus:outline-blue-500 font-bold border-[0.1px] resize-none h-[120px] border-[#9EA5B1] rounded-md w-full"></textarea>
//             </div>
//         </div>

//         <div className="col-span-1 row-start-6 flex flex-nowrap flex-col">
//             Authoriza
//             <input type="text" placeholder="Juan Perez Lopez" className=" bg-gray-100 rounded-md p-2" />
//         </div>

//         <div className="col-span-1 row-start-6 flex flex-nowrap flex-col">
//             Solicitante
//             <input type="text" placeholder="Humberto Martinez Rosas" className=" bg-gray-100 rounded-md p-2" />
//         </div>

//         <div className="col-start-5 row-start-6 flex flex-nowrap flex-col mt-4">
//             <button class="bg-pink-darkest rounded p-4 shadow-md font-mono text-base font-medium bg-red-950 hover:bg-red-900 text-white">Completar</button>
//         </div>

//     </div>
// </div>




{/* <div className="w-full h-auto text-3xl bg-white shadow-md p-6">
    <h2 className="text-2xl mb-4">Loan Form</h2>
    <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="comments" className="block mb-2 text-sm font-medium">
                Comments:
            </label>
            <input
                type="text"
                id="comments"
                name="comments"
                value={loanData.comments}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="responsible" className="block mb-2 text-sm font-medium">
                Responsible:
            </label>
            <input
                type="text"
                id="responsible"
                name="responsible"
                value={loanData.responsible}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="responsibleId" className="block mb-2 text-sm font-medium">
                Responsible ID:
            </label>
            <input
                type="text"
                id="responsibleId"
                name="responsibleId"
                value={loanData.responsibleId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="contact1" className="block mb-2 text-sm font-medium">
                Contact 1:
            </label>
            <input
                type="text"
                id="contact1"
                value={loanData.contact[0]}
                onChange={(e) => handleContactChange(e, 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="contact2" className="block mb-2 text-sm font-medium">
                Contact 2:
            </label>
            <input
                type="text"
                id="contact2"
                value={loanData.contact[1]}
                onChange={(e) => handleContactChange(e, 1)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="itemDescription" className="block mb-2 text-sm font-medium">
                Item Description:
            </label>
            <input
                type="text"
                id="itemDescription"
                value={loanData.items[0].description}
                onChange={(e) => null}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
        </div>
        <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
            Submit
        </button>
    </form>
</div> */}