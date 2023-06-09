import HttpBase from "./HttpBase";
import { C } from "../constants/C";
import { getAuthToken } from "../constants/utils";

class AssetService extends HttpBase {

  constructor() {
    super({
      baseUrl: `${C.api_url()}asset`,
    });
  }

  async getAssets({ code = null, group = null, subGroup = null, altGroup = null, desc = null, isActive = true }, callback = () => { }) {
    return await this.request({
      token: getAuthToken(),
      options: {
        params: {
          code,
          group,
          subGroup,
          altGroup,
          desc,
          isActive
        },
        headers: {
          'Content-Type': 'application/json'
        }
      },
      callback: callback
    });
  }

  async getAsset(id, callback = () => { }) {
    return await this.request({
      token: getAuthToken(),
      endpoint: `${id}`,
      options: {
        headers: {
          'Content-Type': 'application/json'
        }
      },
      callback: callback
    });
  }


  async getAssetGroup({ childCode = null, parentGroup = null, parentSubGroup = null, parentAltGroup = null, childGroup = null, childAltGroup = null, isActive = null }, callback = () => { }) {
    return await this.request({
      token: getAuthToken(),
      endpoint: 'group',
      options: {
        params: {
          childCode,
          parentGroup,
          parentSubGroup,
          parentAltGroup,
          childGroup,
          childAltGroup,
          isActive
        },
        headers: {
          'Content-Type': 'application/json'
        }
      },
      callback: callback
    });
  }

  async setAsset({ isActive = true, code = null, value = null, group = null, subGroup = null, alternativeGroup = null, description = [] }, callback = () => { }) {
    const requestData = {
      isActive,
      code,
      value,
      group,
      subGroup,
      alternativeGroup,
      description
    };

    return await this.request({
      token: getAuthToken(),
      options: {
        method: 'post',
        data: requestData,
        headers: {
          'Content-Type': 'application/json'
        }
      },
      callback: callback
    });
  }

}

export default AssetService;