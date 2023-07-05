import axios from "axios";
import {C} from "../constants/C";

class HttpBase {
    static onError = () => {};

    constructor({baseUrl}) {
        if (!baseUrl) {
            throw new Error('Required parameters missing');
        }
      
        this.baseUrl = baseUrl;
    }

    authenticationHeader(token) {
        return {'Authorization': `Bearer ${token}`}
    }

    getResponse({
        result, 
        callback = () => {},  
        errorCallback = () => {}
    }) {

        if(result.status == C.status.common.ok) {
            if (typeof callback === 'function') {
                callback(result);
            }
        } else {
            this.broadcastError(result, errorCallback);
        }

    }

    request({
        endpoint = '', 
        options = { method: 'get' }, 
        callback = () => {}, 
        errorCallback = () => {},
        token = ''
    }) {

        if(token) {
            let header = this.authenticationHeader(token);
            options.headers =  {
                ...header
            }
        }

        axios({
            url: `${this.baseUrl}/${endpoint}`,
            ...options,
        }).then(res => {

            this.getResponse({
                result: res.data, 
                callback: callback,
                errorCallback: errorCallback
            });

        }).catch(error => this.broadcastError(error, errorCallback));
    }

    broadcastError(error, errorCallback = () => {}) {

        console.error(error);

        // TODO: Implement generic error as static prop!
        if (typeof errorCallback === 'function') {
            errorCallback(error);
        }

        if (typeof HttpBase.onError === 'function') {
            HttpBase.onError(error);
        }

    }

}

export default HttpBase;