import HttpBase from "./HttpBase";
import {C} from "../constants/C";
import { getAuthToken } from "../constants/Utils";

class LoanService extends HttpBase {

    constructor() {
        super({
            baseUrl: `${C.api_url()}loan`,        
        });
    }

    getLoans({ id = null, fromDt = null, toDt = null, comments = null, mode = null, isActive = true }, callback = () => {}) {
        this.request({
          token: getAuthToken(),
          options: {
            data: {
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

    getLoan(id, callback = () => {}) {
        this.request({
            endpoint: `${id}`,
            options: {
                headers: {
                    'Content-Type': 'application/json'
                }   
            },
            callback: callback
        });
    }

    getLoanModes(callback = () => {}) {
        this.request({
            endpoint: 'mode',
            options: {
                headers: {
                    'Content-Type': 'application/json'
                }   
            },
            callback: callback
        });
    }

    getLoanMode(mode, callback = () => {}) {
        this.request({
            endpoint: `mode/${mode}`,
            options: {
                headers: {
                    'Content-Type': 'application/json'
                }   
            },
            callback: callback
        });
    }

    getLoanDetails({ id = null, fromDt = null, toDt = null, loanId = null, dtlDescription = null, dtlStatus = null, comments = null, loanMode = null, loanStatus = null, inventoryId = null, customId = null, serial = null, model = null, brand = null, isActive = null }, callback = () => {}) {
        this.request({
          token: getAuthToken(),
          endpoint: 'detail',
          options: {
            data: {
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

    getLoanDetail(id, callback = () => {}) {
        this.request({
            endpoint: `detail/${id}`,
            options: {
                headers: {
                    'Content-Type': 'application/json'
                }   
            },
            callback: callback
        });
    }

    setLoan({ id = null, isActive = true, comments = null, loanedOn = null, returnedOn = null, mode = { code: null }, loanStatus = null, responsible = null, responsibleId = null, contact = [], items = [] }, callback = () => {}) {
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
      
        this.request({
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

    setLoanDetail({ id = null, isActive = true, item = { id: null }, description = null, detailStatus = null, loan = { id: null } }, callback = () => {}) {
        const requestBody = {
          id,
          isActive,
          item,
          description,
          detailStatus,
          loan
        };
      
        this.request({
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

export default LoanService;