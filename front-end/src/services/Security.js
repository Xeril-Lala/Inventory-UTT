import HttpBase from "./HttpBase";
import {C} from "../constants/C";


class SecurityService extends HttpBase {

    constructor() {
        super({
            baseUrl: `${C.api_url()}Security`,        
        });
    }

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
    
    async checkToken(token, refreshToken, callback = () => { }) {
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
        })
    }

}

export default SecurityService;