import axios from "axios";

class HttpBase {
    constructor({baseUrl}) {
        if (!baseUrl) {
            throw new Error('Required parameters missing');
        }
      
        this.baseUrl = baseUrl;
    }

    authenticationHeader(token)
    {
        return {'Authorization': `Bearer ${token}`}
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
            url: new URL(endpoint, this.baseUrl).href,
            ...options,
        }).then(res => {
            if (typeof this.callback === 'function') {
                callback(res.data);
            }
        }).catch(error => {
            console.error(error);

            // TODO: Implement generic error as static prop!
            if (typeof this.errorCallback === 'function') {
                errorCallback(error);
            }
        });
    }

}

export default HttpBase;