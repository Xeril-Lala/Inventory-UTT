// Importar la librería axios para realizar peticiones HTTP y las constantes desde archivos locales
import axios from "axios";
import { C } from "../constants/C";

// Definir la clase base para las peticiones HTTP
class HttpBase {
    // Definir una función de manejo de errores por defecto
    static onError = () => {};

    // Constructor de la clase
    constructor({baseUrl}) {
        if (!baseUrl) {
            throw new Error('Required parameters missing');
        }
      
        this.baseUrl = baseUrl;
    }

    // Crear un encabezado de autenticación con el token
    authenticationHeader(token) {
        return {'Authorization': `Bearer ${token}`}
    }

    // Procesar la respuesta de una petición
    getResponse({
        result, 
        callback = () => {},  
        errorCallback = () => {}
    }) {
        // Si el resultado tiene un estado exitoso
        if(result.status == C.status.common.ok) {
            if (typeof callback === 'function') {
                callback(result);
            }
        } else {
            // En caso de error, manejarlo
            this.broadcastError(result, errorCallback);
        }
    }

    // Realizar una petición HTTP
    async request({
        endpoint = '', 
        options = { method: 'get' }, 
        callback = () => {}, 
        errorCallback = () => {},
        token = ''
    }) {
        // Si se proporcionó un token, agregarlo a los encabezados
        if(token) {
            let header = this.authenticationHeader(token);
            options.headers =  {
                ...options.headers,
                ...header
            }
        }

        let res = null;

        try {
            // Realizar la petición usando axios
            res = await axios({
                ...options,
                url: !endpoint ? this.baseUrl : `${this.baseUrl}/${endpoint}`
            });

            // Procesar la respuesta obtenida
            this.getResponse({
                result: res.data, 
                callback: callback,
                errorCallback: errorCallback
            });

        } catch (err) {
            // En caso de error, manejarlo
            this.broadcastError(err, errorCallback);
        }
        
        return res?.data;
    }

    // Manejar y notificar errores
    broadcastError(error, errorCallback = () => {}) {
        // Obtener el mensaje de error personalizado
        const getError = () => {
            const getCustomError = () => {
                var err = error?.data
                .map((error) => error.message)
                .join(" ");

                return err;
            }

            return  error?.message ?? 
                error?.title ?? 
                getCustomError() ?? 
                C.status.common.error
            ;
        };

        // Imprimir el mensaje de error en la consola
        console.error(getError());

        // Ejecutar la función de manejo de error proporcionada
        if (typeof errorCallback === 'function') {
            errorCallback(getError());
        }

        // Ejecutar la función de manejo de errores global
        if (typeof HttpBase.onError === 'function') {
            HttpBase.onError(getError());
        }
    }
}

// Exportar la clase base para las peticiones HTTP
export default HttpBase;
