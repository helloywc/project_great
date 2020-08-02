import { request } from '../utils/request';
import config from '../config';
const db = wx.cloud.database()

export function login(params) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: params, name:'login'
  }).then(function(res) {
    return res;
  });
}

