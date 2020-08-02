import { request } from '../../../utils/request';
import config from '../../../config';
const db = wx.cloud.database()


export function login(params) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: params,
    type:'cloudFn',doc:'login',name:'login',
    cloud:() => {}
  }).then(function(res) {
    getApp().globalData.openid = res.openid;
    return res;
  });
}
