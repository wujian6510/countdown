import api from '../utils/http';

export default class {
  static async writeFile(params) {
    return api.post('/writeFile', params);
  }

  static async readFile(params) {
    return api.get('/readFile', params);
  }

  static async getBSS3Data() {
    const t = new Date().getTime();
    return api.get(`/api/bss3.json?t=${t}`);
  }

  static async getReadyStatus() {
    const t = new Date().getTime();
    return api.get(`/api/readyStatus.json?t=${t}`);
  }
  static async getOtherAppData(appname) {
    const t = new Date().getTime();
    return api.get(`/api/${appname}.json?t=${t}`);
  }

  static async getControlData(params) {
    return api.post(`/control/getControlData.do`,params);
  }

  static async setCommandState(params) {
    return api.post(`/control/setCommandState.do`,params);
  }
}
