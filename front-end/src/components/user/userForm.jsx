import React, { useEffect, useState } from 'react';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';

const UserForm = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: ''
  });

  const handleButtonClick = () => {
    setIsHidden(!isHidden);
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('User created:', data);
        // Aquí puedes realizar cualquier acción adicional después de crear el usuario
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  };

  return (
    <div className="bg-white p-12 rounded-md shadow-md">
      <div className="flex justify-center">
        <button
          className="hover:bg-green-500 hover:transition-colors hover:duration-300 active:text-green-700 rounded p-4 shadow-md font-mono text-base font-medium bg-red-950 text-white  w-[50%]  focus:bg-green-300"
          onClick={handleButtonClick}
        >
          Nuevo Usuario
        </button>
      </div>
      {!isHidden && (
        <div>
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-2 gap-4 p-12 text-base font-mono">
              <div className="col-span-2 row-start-2 flex flex-nowrap flex-col">
                <p>Nombre(s)</p>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                  className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <div className="col-span-2 row-start-3 flex flex-nowrap flex-col">
                <p>Apellido(s)</p>
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                  placeholder="Apellido"
                  className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <div className="col-span-2 row-start-4 flex flex-nowrap flex-col">
                <p>Correo Electrónico</p>
                <input
                  type="text"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  placeholder="Correo Electrónico"
                  className="bg-gray-100 rounded-md p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="hover:bg-green-500 hover:transition-colors hover:duration-300 active:text-green-700 rounded p-4 shadow-md font-mono text-base font-medium bg-red-950 text-white focus:bg-green-300"
              >
                Crear Usuario Nuevo
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserForm;
