// Importar los módulos y componentes necesarios desde las bibliotecas y archivos locales
import React, { useState } from 'react';
import { sha256 } from 'js-sha256';
import SecurityService from '../../services/Security';
import { C } from '../../constants/C';
import { LoginLocalStorage } from '../../constants/utils';
import { AuthContext } from '../../context/Context';
import { Navigate } from 'react-router-dom';

// Definir el componente funcional para la página de inicio de sesión
const Login = () => {
  // Obtener funciones y datos del contexto de autenticación
  const { setUserInfo, userInfo } = React.useContext(AuthContext);
  const request = new SecurityService();

  // Estados para almacenar valores de usuario y contraseña, y mensaje del formulario
  const [userValue, setUser] = useState('');
  const [passwordValue, setPassword] = useState('');
  const [formMsg, setMsg] = useState('');

  // Función para autenticar al usuario
  const auth = async (event) => {
    event.preventDefault();

    if (userValue && passwordValue) {
      // Hash de la contraseña usando sha256
      var hashedPassword = sha256(passwordValue);

      // Realizar solicitud de autenticación
      var res = await request.authLogin(
        userValue,
        hashedPassword,
        res => {
          if (!res.data?.token || res.data == C.status.common.no_auth) {
            setMsg('Usuario o Contraseña incorrectos');
          } else {
            setUserInfo(res.data);
            setMsg('');
          }
        }
      );
    } else {
      setMsg('Favor de llenar los campos necesarios!');
    }

    event.target.reset();
  }

  // Obtener información del usuario desde el contexto
  var user = typeof userInfo === 'function' ? userInfo() : null;

  // Redirigir si el usuario ya está autenticado
  if (user?.token) {
    return <Navigate to="/" replace />;
  } else {
    // Renderizar la página de inicio de sesión
    return (
      <section class="pt-20 flex items-center justify-center">
        <div class="flex border rounded-md shadow-lg max-w-3xl p-5 items-center bg-white">
          {/* Columna de información de inicio de sesión */}
          <div class="md:w-1/2 px-8 md:px-16">
            <h2 class="font-normal text-2xl text-[#4d0f1c]">Iniciar Sesión</h2>

            <form onSubmit={auth} class="flex flex-col gap-4 text-sm">
              {/* Campo de entrada de usuario */}
              <input
                class="p-2 mt-8 rounded-md border"
                onChange={e => setUser(e.target.value)}
                name='username'
                placeholder="Usuario"
                autoFocus="true"
                autoComplete='off'
              />

              {/* Campo de entrada de contraseña */}
              <input
                class="p-2 rounded-md border w-full"
                onChange={e => setPassword(e.target.value)}
                name='password'
                type="password"
                placeholder="Contraseña"
              />

              {/* Mensaje de error del formulario */}
              <p className={`text-red-500 text-xs italic ${formMsg ? '' : 'hidden'}`}>
                {formMsg}
              </p>

              {/* Botón de envío del formulario */}
              <button type='submit' class="bg-[#4d0f1c] rounded-md text-white py-2 hover:scale-105 duration-300">Siguiente</button>
            </form>

            {/* Enlace de "Olvidó su contraseña" */}
            <div class="mt-5 text-xs border-b border-[#4d0f1c] py-4 text-[#4d0f1c]">
              <a href="#">¿Olvidó su contraseña?</a>
            </div>
          </div>

          {/* Columna de imagen (bloque oculto en pantallas pequeñas) */}
          <div class="md:block hidden w-1/2">
            {/* TODO: Agregar tus imágenes en Constants JS */}
            <img class="rounded-md" src="https://www.coracyt.gob.mx/images/2021/noviembre/UTT_CONFERENCIAS-F-4.jpg" />
          </div>
        </div>
      </section>
    );
  }
};

// Exportar el componente para su uso en otros módulos
export default Login;
