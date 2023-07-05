import react, { useState } from 'react';
import { sha256 } from 'js-sha256';
import SecurityService from '../../services/Security';
import {C} from '../../constants/C';
import { LoginLocalStorage } from '../../constants/Utils';
import { AuthContext } from '../../context/Context';
import { Navigate } from 'react-router-dom';

const Login = () => {

  const { setUserInfo, userInfo } = react.useContext(AuthContext);
  const request = new SecurityService();
  const [userValue, setUser] = useState('');
  const [passwordValue, setPassword] = useState('');
  const [formMsg, setMsg] = useState('');

  const auth = (event) => {
    event.preventDefault();

    if(userValue && passwordValue) {
      var hashedPassword = sha256(passwordValue);

      request.authLogin(
        userValue,
        hashedPassword,
        res => {

          if(!res.data?.token || res.data == C.status.common.no_auth) {
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

  var user = typeof userInfo === 'function' ? userInfo() : null;

  if (user?.token) {
    return <Navigate to="/" replace />;
  } else return (
    <section class="pt-20 flex items-center justify-center">
      <div class="flex border rounded-md shadow-lg max-w-3xl p-5 items-center bg-white">

        <div class="md:w-1/2 px-8 md:px-16">
          <h2 class="font-normal text-2xl text-[#4d0f1c]">Iniciar Sesión</h2>

          <form onSubmit={auth} class="flex flex-col gap-4 text-sm">

            <input
              class="p-2 mt-8 rounded-md border"
              onChange={e => setUser(e.target.value)}
              name='username'
              placeholder="Usuario"
              autoFocus="true"
              autoComplete='off'
            />

            <input
              class="p-2 rounded-md border w-full"
              onChange={e => setPassword(e.target.value)}
              name='password'
              type="password"
              placeholder="Contraseña"
            />

            <p className={ 
                `text-red-500 text-xs italic  ${formMsg ? '' : 'hidden'} `
              }
            >
              {formMsg}
            </p>

            <button type='submit' class="bg-[#4d0f1c] rounded-md text-white py-2 hover:scale-105 duration-300">Siguiente</button>
          </form>

          <div class="mt-5 text-xs border-b border-[#4d0f1c] py-4 text-[#4d0f1c]">
            <a href="#">¿Olvidó su contraseña?</a>
          </div>
        </div>

        <div class="md:block hidden w-1/2">
          {/* TODO: Add your images on Constants JS */}
          <img class="rounded-md" src="https://www.coracyt.gob.mx/images/2021/noviembre/UTT_CONFERENCIAS-F-4.jpg" />
        </div>

      </div>
    </section>
  );
};


export default Login;