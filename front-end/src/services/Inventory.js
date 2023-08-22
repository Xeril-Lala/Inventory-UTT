// Importar la clase base para las peticiones HTTP y las constantes desde archivos locales
import HttpBase from "./HttpBase";
import { C } from "../constants/C";
import { getAuthToken } from "../constants/utils";

// Definir la clase para el servicio de inventario
class InventoryService extends HttpBase {

    // Constructor del servicio de inventario
    constructor() {
        super({
            baseUrl: `${C.api_url()}item`,
        });
    }

    // Obtener elementos del inventario con opciones de filtrado
    async getItems(
        {
            isActive = true,
            id = null,
            customId = null,
            serial = null,
            name = null,
            model = null,
            fromDt = null,
            toDt = null,
            isUsed = null
        },
        callback = () => { }
    ) {
        return await this.request({
            token: getAuthToken(),
            options: {
                params: {
                    isActive, id, customId, serial, name, model, fromDt, toDt, isUsed
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            callback: callback,
        });
    }

    // Obtener información de un elemento del inventario por ID
    async getItem(id, callback = () => { }) {
        return await this.request({
            endpoint: `${id}`,
            token: getAuthToken(),
            options: {
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            callback: callback
        });
    }

    // Crear o actualizar un elemento en el inventario
    async setItem(
        {
            isActive = null,
            id = null,
            name = null,
            customKey = null,
            about = null,
            acquisition = null,
            model = {
                code: null,
            },
            location = {
                code: null,
            },
            serial = null,
            conditionUse = null
        },
        callback = () => { }
    ) {
        return await this.request({
            token: getAuthToken(),
            options: {
                method: 'post',
                data: {
                    isActive, 
                    id, 
                    name, 
                    customKey,
                    about, 
                    acquisition, 
                    model,
                    location, 
                    serial, 
                    conditionUse
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            callback: callback
        })
    }

    // Subir un archivo Excel para actualizar elementos en el inventario
    async setItemExcel(
        file,
        callback = () => { }
    ) {
        // Crear un formulario de datos para el archivo
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

// Exportar la clase del servicio de inventario
export default InventoryService;
