import { request } from '../../../utils/request';
import config from '../../../config';
const db = wx.cloud.database()


export function getPageList(params) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: params,
    type:'cloudFn',doc:'api-uua',name:'getPageList',
    cloud:() => {
      return new Promise((reslove,reject) =>{
        db.collection('user').where({_openid:params.openid}).get().then(res =>{
          if(res.data[0].roleId.join().indexOf("0") === -1) return false;
          db.collection('page').get().then(res =>{
            return reslove(res)
          }).catch(err =>{
            return reject(err)
          })
        })
      })
    }
  }).then(function(res) {
    return res;
  });
}

// 获取页面详情
export function getPageDetailByPageId(params) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: params,
    type:'cloudFn',doc:'api-uua',name:'getPageDetailByPageId',
    cloud:() => {
      return new Promise((reslove,reject) =>{
        db.collection('user').where({_openid:params.openid}).get().then(res =>{
          if(res.data[0].roleId.join().indexOf("0") === -1) return false;
          db.collection('page').where({pageId:params.pageId}).get().then(res =>{
            return reslove(res)
          }).catch(err =>{
            return reject(err)
          })
        })
      })
    }
  }).then(function(res) {
    return res;
  });
}

// 更新页面详情
export function updatePageDetailByPageId(params) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: params,
    type:'cloudFn',doc:'api-uua',name:'updatePageDetailByPageId',
    cloud:() => {}
  }).then(function(res) {
    return res;
  });
}

// 绑定上级后，下级父元素解绑置空
export function clearPageParentByPagePname(params) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: params,
    type:'cloudFn',doc:'api-uua',name:'clearPageParentByPagePname',
    cloud:() => {}
  }).then(function(res) {
    return res;
  });
}
