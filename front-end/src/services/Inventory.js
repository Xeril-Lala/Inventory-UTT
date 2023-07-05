import HttpBase from "./HttpBase";
import {C} from "../constants/C";
import { getAuthToken } from "../constants/Utils";

class InventoryService extends HttpBase {

    constructor() {
        super({
            baseUrl: `${C.api_url()}item`,        
        });
    }

    getItems(
        {
            isActive = true,
            id = null,
            customId = null,
            serial = null,
            name = null,
            model = null,
            fromDt = null,
            toDt = null
        },
        callback = () => {}
    ) 
    {
        this.request({ 
            token: getAuthToken(),
            options: {
                data: {
                    isActive, id, customId, serial, name, model, fromDt, toDt            
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            callback: callback,
        });
    }

    getItem(id, callback = () => {}) {
        this.request({
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

    setItem(
        { 
            isActive = null,
            id = null,
            name = null,
            customKey = null,
            about = null,
            acquisition = null,
            model = {
                code: null
            },
            location= {
                code: null
            },
            serial = null,
            conditionUse = null
        }, 
        callback = () => {}
    ) 
    {
        this.request({
            token: getAuthToken(),
            options: {
                method: 'post',
                data: {
                    isActive, id, name, customKey, 
                    about, acquisition, model,
                    location, serial, conditionUse
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            callback: callback
        })
    }

    setItemExcel(
        file,
        callback = () => {}
    ) 
    {
        const formData = new FormData();
        formData.append('files', file);
      
        this.request({
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