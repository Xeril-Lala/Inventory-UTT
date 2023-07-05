import HttpBase from "./HttpBase";
import {C} from "../constants/C";
import { getAuthToken } from "../constants/Utils";

class UserService extends HttpBase {

    constructor() {
        super({
            baseUrl: `${C.api_url()}user`,        
        });
    }

    getUsers(
        { 
            username = null, 
            search = null, 
            isActive = null 
        },
        callback = () => {}
    ) 
    {
        this.request({
            token: getAuthToken(),
            options: {
                data: { username, search, isActive },
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            callback: callback
        });
    }

    getUser(username, callback = () => {}) {
        this.request({
          token: getAuthToken(),
          endpoint: `${username}`,
          options: {
            headers: {
              'Content-Type': 'application/json'
            }
          },
          callback: callback
        });
    }

    setUser({ isActive = null, username = null, password = null, name = null, lastname = null, group = null }, callback = () => {}) {
        this.request({
            token: getAuthToken(),
            options: {
            method: 'post',
            data: {
                isActive,
                username,
                password,
                name,
                lastname,
                group
            },
            headers: {
                'Content-Type': 'application/json'
            }
            },
            callback: callback
        });
    }

    setContact({ isActive = null, id = null, userDetails = { username: null }, enrollment = null, email = null, alternativeEmail = null, phone = null, alternativePhone = null, address = null }, callback = () => {}) {
        this.request({
          token: getAuthToken(),
          endpoint: 'contact',
          options: {
            method: 'post',
            data: {
              isActive,
              id,
              userDetails,
              enrollment,
              email,
              alternativeEmail,
              phone,
              alternativePhone,
              address
            },
            headers: {
              'Content-Type': 'application/json'
            }
          },
          callback: callback
        });
    }

}

export default UserService;