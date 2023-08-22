// Importar la clase base para las peticiones HTTP y las constantes desde archivos locales
import HttpBase from "./HttpBase";
import { C } from "../constants/C";
import { getAuthToken } from "../constants/utils";

// Definir la clase para el servicio de préstamos
class LoanService extends HttpBase {

  // Constructor del servicio de préstamos
  constructor() {
    super({
      baseUrl: `${C.api_url()}loan`,
    });
  }

  // Obtener préstamos con opciones de filtrado
  async getLoans({ id = null, fromDt = null, toDt = null, comments = null, mode = null, isActive = true }, callback = () => { }) {
    return await this.request({
      token: getAuthToken(),
      options: {
        params: {
          id,
          fromDt,
          toDt,
          comments,
          mode,
          isActive
        },
        headers: {
          'Content-Type': 'application/json'
        }
      },
      callback: callback
    });
  }

  // Obtener información de un préstamo por ID
  async getLoan(id, callback = () => { }) {
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

  // Obtener modos de préstamo
  async getLoanModes(callback = () => { }) {
    return await this.request({
      token: getAuthToken(),
      endpoint: 'mode',
      options: {
        headers: {
          'Content-Type': 'application/json'
        }
      },
      callback: callback
    });
  }

  // Obtener un modo de préstamo por código de modo
  async getLoanMode(mode, callback = () => { }) {
    return await this.request({
      token: getAuthToken(),
      endpoint: `mode/${mode}`,
      options: {
        headers: {
          'Content-Type': 'application/json'
        }
      },
      callback: callback
    });
  }

  // Obtener detalles de préstamos con opciones de filtrado
  async getLoanDetails({ id = null, fromDt = null, toDt = null, loanId = null, dtlDescription = null, dtlStatus = null, comments = null, loanMode = null, loanStatus = null, inventoryId = null, customId = null, serial = null, model = null, brand = null, isActive = null }, callback = () => { }) {
    return await this.request({
      token: getAuthToken(),
      endpoint: 'detail',
      options: {
        params: {
          id,
          fromDt,
          toDt,
          loanId,
          dtlDescription,
          dtlStatus,
          comments,
          loanMode,
          loanStatus,
          inventoryId,
          customId,
          serial,
          model,
          brand,
          isActive
        },
        headers: {
          'Content-Type': 'application/json'
        }
      },
      callback: callback
    });
  }

  // Obtener un detalle de préstamo por ID
  async getLoanDetail(id, callback = () => { }) {
    return await this.request({
      token: getAuthToken(),
      endpoint: `detail/${id}`,
      options: {
        headers: {
          'Content-Type': 'application/json'
        }
      },
      callback: callback
    });
  }

  // Crear o actualizar un préstamo
  async setLoan({ id = null, isActive = true, comments = null, loanedOn = null, returnedOn = null, mode = { code: null }, loanStatus = null, responsible = null, responsibleId = null, contact = [], items = [] }, callback = () => { }) {
    const requestBody = {
      id,
      isActive,
      comments,
      loanedOn,
      returnedOn,
      mode,
      loanStatus,
      responsible,
      responsibleId,
      contact,
      items
    };

    return await this.request({
      token: getAuthToken(),
      options: {
        method: 'post',
        data: requestBody,
        headers: {
          'Content-Type': 'application/json'
        }
      },
      callback: callback
    });
  }

  // Crear o actualizar un detalle de préstamo
  async setLoanDetail({ id = null, isActive = true, item = { id: null }, description = null, detailStatus = null, loan = { id: null } }, callback = () => { }) {
    const requestBody = {
      id,
      isActive,
      item,
      description,
      detailStatus,
      loan
    };

    return await this.request({
      token: getAuthToken(),
      endpoint: 'detail',
      options: {
        method: 'post',
        data: requestBody,
        headers: {
          'Content-Type': 'application/json'
        }
      },
      callback: callback
    });
  }

}

// Exportar la clase del servicio de préstamos
export default LoanService;
