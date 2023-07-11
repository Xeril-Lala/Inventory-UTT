import React, { useState, useEffect } from 'react';
import LoanService from '../../services/Loan';
import Select from 'react-select';

const MyForm = () => {
    const [responsable, setResponsable] = useState('');
    const [responsableID, setResponsableID] = useState('');
    const [responsableContact, setResponsableContact] = useState('');
    const [loanType, setLoanType] = useState('');
    const [objectItem, setObjectItem] = useState('');
    const [objectItemList, setObjectItemList] = useState([]);
    const [comments, setComments] = useState('');

    const [modes, setModes] = useState([]);

    const loanService = new LoanService();

    useEffect(() => {
        const fetchData = async () => {
            let res = await loanService.getLoanModes();
            if(res?.data) {
                let m = res.data.map(x => ({value: x.code, label: x.code}));
                setModes(m);
            }
        }

        fetchData();
    }, []);

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
        <div>
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
                        <Select
                            value={loanType}
                            options={modes}
                            onChange={setLoanType}
                            isClearable
                            isSearchable
                            placeholder="Selecciona una opcion"
                        />
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
        </div>
    );
};

export default MyForm;