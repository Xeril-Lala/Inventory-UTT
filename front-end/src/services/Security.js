// Importar la clase base para las peticiones HTTP y las constantes desde archivos locales
import HttpBase from "./HttpBase";
import { C } from "../constants/C";

// Definir la clase para el servicio de seguridad
class SecurityService extends HttpBase {

    // Constructor del servicio de seguridad
    constructor() {
        super({
            baseUrl: `${C.api_url()}Security`,
        });
    }

    // Autenticar un usuario mediante un inicio de sesión
    async authLogin(username, password, callback = () => { }) {
        return await this.request({
            endpoint: 'login',
            options: {
                method: 'post',
                data: {
                    "user": username,
                    "password": password
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            callback: callback
        });
    }

    // Verificar un token de acceso y su token de actualización
    async checkToken(token, refreshToken, callback = () => { }, error = () => { }) {
        return await this.request({
            endpoint: 'checkToken',
            token: token,
            options: {
                method: 'post',
                data: {
                    "refreshToken": refreshToken
                }
            },
            callback: callback,
            errorCallback: error
        });
    }

}

// Exportar la clase del servicio de seguridad
export default SecurityService;
