import HttpBase from "./HttpBase";
import C from "../constants/C";


class SecurityService extends HttpBase {

    constructor() {x
        let x = C.api_url();

        super({
            baseUrl: `${C.api_url()}/Security`,
            
        });
    }

    authLogin(username, password, callback = () => { }) {
        this.request({
            endpoint: '/login',
            options: {
                method: 'post',
                data: {
                    "user": username,
                    "password": password
                }
            },
            callback: callback
        });
    }

    // Check & Refresh token
    checkToken(token, callback = () => { }) {
        this.request({
            endpoint: '/checkToken',
            token: token,
            options: {
                method: 'get',
            },
            callback: callback,
        })
    }

}

export default SecurityService;