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

    async request({
        endpoint = '', 
        options = { method: 'get' }, 
        callback = () => {}, 
        errorCallback = () => {},
        token = ''
    }) {

        if(token) {
            let header = this.authenticationHeader(token);
            options.headers =  {
                ...options.headers,
                ...header
            }
        }

        let res = null;

        try {
            res = await axios({
                ...options,
                url: !endpoint ? this.baseUrl : `${this.baseUrl}/${endpoint}`
            });

            this.getResponse({
                result: res.data, 
                callback: callback,
                errorCallback: errorCallback
            });

        } catch (err) {
            this.broadcastError(err, errorCallback);
        }
        
        return res?.data;
    }

    broadcastError(error, errorCallback = () => {}) {

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

        console.error(getError());

        if (typeof errorCallback === 'function') {
            errorCallback(getError());
        }

        if (typeof HttpBase.onError === 'function') {
            HttpBase.onError(getError());
        }

    }

}

export default HttpBase;