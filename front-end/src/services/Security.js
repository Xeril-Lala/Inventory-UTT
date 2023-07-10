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

    // Check & Refresh token
    async checkToken(token, callback = () => { }) {
        return await this.request({
            endpoint: 'checkToken',
            token: token,
            options: {
                method: 'get',
            },
            callback: callback,
        })
    }

}

export default SecurityService;