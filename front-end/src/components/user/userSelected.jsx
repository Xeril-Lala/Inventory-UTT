import React, { useEffect, useState } from 'react';

const UserSelected = ({ item }) => {
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
    <div>
      {item && (
        <div>
          <div className="grid grid-cols-2 gap-4 bg-white rounded-md p-12 w-[20%] text-base font-mono shadow-md fixed right-[40%]">
            <div className="col-span-2 row-start-2 flex flex-nowrap flex-col">
              <p>Nombre(s)</p>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Nombre"
                className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                readOnly={readOnly}
              />
            </div>
            <div className="col-span-2 row-start-3 flex flex-nowrap flex-col">
              <p>Apellido(s)</p>
              <input
                type="text"
                value={userName}
                onChange={handleUserNameChange}
                placeholder="Apellido"
                className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                readOnly={readOnly}
              />
            </div>
            <div className="col-span-2 row-start-4 flex flex-nowrap flex-col">
              <p>Matricula/Numero de Empleado</p>
              <input
                type="number"
                min="0"
                placeholder="Matricula/Numero de Empleado"
                className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                readOnly={readOnly}
              />
            </div>
            <div className="col-span-2 row-start-5 flex flex-nowrap flex-col">
              <p>Turno</p>
              <input
                type="text"
                min="0"
                placeholder="Turno"
                className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                readOnly={readOnly}
              />
            </div>
            <div className="col-span-2 row-start-6 flex flex-nowrap flex-col">
              <p>Grupo</p>
              <input
                type="text"
                min="0"
                placeholder="Grupo"
                className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                readOnly={readOnly}
              />
            </div>
            <div className="col-span-2 row-start-7 flex flex-nowrap flex-col">
              <p>Correo Electronico</p>
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                min="0"
                placeholder="Correo Electronico"
                className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                readOnly={readOnly}
              />
            </div>
          </div>
          <button onClick={handleEditClick}>Editar</button>
        </div>
      )}
    </div>
  );
};

export default UserSelected;
