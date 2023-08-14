import HttpBase from "./HttpBase";
import { C } from "../constants/C";
import { getAuthToken } from "../constants/utils";

class InventoryService extends HttpBase {

    constructor() {
        super({
            baseUrl: `${C.api_url()}item`,
        });
    }

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

    async setItemExcel(
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

export default InventoryService;






