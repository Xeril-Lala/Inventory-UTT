import React, { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';

const EquipmentSelected = ({ item }) => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [readOnly, setReadOnly] = useState(true);

  useEffect(() => {
    if (item) {
      setName(item.name || '');
      setUserName(item.username || '');
      setEmail(item.email || '');
    }
  }, [item]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleEditClick = () => {
    setReadOnly(false);
  };

  return (
    <div className="w-[100%]">
      {item && (
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

export default EquipmentSelected;
