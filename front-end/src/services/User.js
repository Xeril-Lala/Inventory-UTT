import HttpBase from "./HttpBase";
import {C} from "../constants/C";
import { getAuthToken } from "../constants/utils";

class UserService extends HttpBase {

    constructor() {
        super({
            baseUrl: `${C.api_url()}user`,
        });
    }

    async getUsers(
        { 
            username = null, 
            search = null, 
            isActive = null 
        },
        callback = () => {}
    ) 
    {
        return await this.request({
            token: getAuthToken(),
            options: {
                method: 'get',
                params: { username, search, isActive }
            },
            callback: callback
        });
    }

    async getUser(username, callback = () => {}) {
        return await this.request({
          token: getAuthToken(),
          endpoint: `${username}`,
          callback: callback
        });
    }

    async setUser({ isActive = null, username = null, password = null, name = null, lastname = null, group = null }, callback = () => {}) {
        return await this.request({
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

    async setContact({ isActive = null, id = null, userDetails = { username: null }, enrollment = null, email = null, alternativeEmail = null, phone = null, alternativePhone = null, address = null }, callback = () => {}) {
        return await this.request({
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

    async setFullInfo(
        {
            isActive = null, id = null, enrollment = null, email = null, alternativeEmail = null, phone = null, alternativePhone = null, address = null,
            username = null, password = null, name = null, lastname = null, group = null
        },
        callback = () => {}
    ) {
        return await this.request({
            token: getAuthToken(),
            endpoint: 'fullInfo',
            options: {
                method: 'post',
                data: {
                    userDetails: {
                        username: username
                    },
                    isActive, id, enrollment, email, alternativeEmail, phone, alternativePhone, address,
                    username, password, name, lastname, group
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