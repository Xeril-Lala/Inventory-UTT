// Importar la clase base para las peticiones HTTP y las constantes desde archivos locales
import HttpBase from "./HttpBase";
import { C } from "../constants/C";
import { getAuthToken } from "../constants/utils";

// Definir la clase para el servicio relacionado con activos
class AssetService extends HttpBase {
  constructor() {
    // Llamar al constructor de la clase base con la URL base específica
    super({
      baseUrl: `${C.api_url()}asset`,
    });
  }

  // Obtener la lista de activos con opciones de filtrado
  async getAssets(
    {
      code = null,
      group = null,
      subGroup = null,
      altGroup = null,
      description = null,
      auditUser = null,
      isActive = true
    },
    callback = () => {}
  ) {
    return await this.request({
      token: getAuthToken(),
      options: {
        params: {
          code,
          group,
          subGroup,
          altGroup,
          description,
          auditUser,
          isActive
        },
        headers: {
          'Content-Type': 'application/json'
        }
      },
      callback: callback
    });
  }

  // Obtener información de un activo específico por ID
  async getAsset(id, callback = () => {}) {
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

  // Obtener grupos de activos con opciones de filtrado
  async getAssetGroup(
    {
      childCode = null,
      parentGroup = null,
      parentSubGroup = null,
      parentAltGroup = null,
      childGroup = null,
      childAltGroup = null,
      isActive = null
    },
    callback = () => {}
  ) {
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

  // Crear o actualizar un activo
  async setAsset(
    {
      isActive = true,
      code = null,
      value = null,
      group = null,
      subGroup = null,
      alternativeGroup = null,
      auditUser = null,
      description = []
    },
    callback = () => {}
  ) {
    const requestData = {
      isActive,
      code,
      value,
      group,
      subGroup,
      alternativeGroup,
      auditUser,
      description,
    };

    return await this.request({
      token: getAuthToken(),
      options: {
        method: 'post', // Usar el método POST para crear o actualizar
        data: requestData,
        headers: {
          'Content-Type': 'application/json'
        }
      },
      callback: callback
    });
  }

  // Obtener la imagen de un activo por su código
  async getImage(code, callback = () => {}) {
    return await this.request({
      token: getAuthToken(),
      endpoint: `image/${code}`,
      options: {
        method: "get",
      }
    });
  }

  // Configurar o actualizar la imagen de un activo
  async setImage({ code = null, image = null, b64 = null }, callback = () => {}) {
    return await this.request({
      token: getAuthToken(),
      endpoint: `image`,
      options: {
        method: "post",
        data: {
          code, image, b64
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    });
  }
}

// Exportar la clase del servicio de activos
export default AssetService;
