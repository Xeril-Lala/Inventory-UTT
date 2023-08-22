// Importar la clase base para las peticiones HTTP, las constantes y las utilidades desde archivos locales
import HttpBase from "./HttpBase";
import { C } from "../constants/C";
import { getAuthToken } from "../constants/utils";

// Definir la clase para el servicio de usuarios
class UserService extends HttpBase {

    // Constructor del servicio de usuarios
    constructor() {
        super({
            baseUrl: `${C.api_url()}user`,
        });
    }

    // Obtener una lista de usuarios con filtros opcionales
    async getUsers(
        { 
            username = null, 
            search = null, 
            group = null,
            isActive = null
        },
        callback = () => {}
    ) 
    {
        return await this.request({
            token: getAuthToken(),
            options: {
                method: 'get',
                params: { username, search, isActive, group }
            },
            callback: callback
        });
    }

    // Obtener información detallada de un usuario específico
    async getUser(username, callback = () => {}) {
        return await this.request({
          token: getAuthToken(),
          endpoint: `${username}`,
          callback: callback
        });
    }

    // Crear o actualizar un usuario con información básica
    async setUser({ isActive = null, username = null, password = null, name = null, lastname = null, group = null }, callback = () => {}) {
        return await this.request({
            token: getAuthToken(),
            options: {
                method: 'post',
                data: {
                    isActive,
                    username,
                    password,
                    name,
                    lastname,
                    group
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            callback: callback
        });
    }

    // Crear o actualizar la información de contacto de un usuario
    async setContact({ isActive = null, id = null, userDetails = { username: null }, enrollment = null, email = null, alternativeEmail = null, phone = null, alternativePhone = null, address = null }, callback = () => {}) {
        return await this.request({
          token: getAuthToken(),
          endpoint: 'contact',
          options: {
            method: 'post',
            data: {
              isActive,
              id,
              userDetails,
              enrollment,
              email,
              alternativeEmail,
              phone,
              alternativePhone,
              address
            },
            headers: {
              'Content-Type': 'application/json'
            }
          },
          callback: callback
        });
    }

    // Crear o actualizar la información completa de un usuario
    async setFullInfo(
        {
            isActive = null, id = null, enrollment = null, email = null, alternativeEmail = null, phone = null, alternativePhone = null, address = null,
            username = null, password = null, name = null, lastname = null, group = null
        },
        callback = () => {}
    ) {
        return await this.request({
            token: getAuthToken(),
            endpoint: 'fullInfo',
            options: {
                method: 'post',
                data: {
                    userDetails: {
                        username: username
                    },
                    isActive, id, enrollment, email, alternativeEmail, phone, alternativePhone, address,
                    username, password, name, lastname, group
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            callback: callback
        });
    }

    // Crear o actualizar usuarios a partir de un archivo Excel
    async setUserExcel(
        file,
        callback = () => { }
    ) {
        const formData = new FormData();
        formData.append('files', file);

        return await this.request({
            token: getAuthToken(),
            endpoint: 'excel',
            options: {
                method: 'post',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            },
            callback: callback
        });
    }

}

// Exportar la clase del servicio de usuarios
export default UserService;
