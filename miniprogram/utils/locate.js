import {subKey} from '../config'
var QQMapWX = require('./qqmap-wx-jssdk.min.js');
var qqmapsdk = new QQMapWX({key: subKey});


// 获取当前坐标
export function getLocation(){
  return new Promise((resolve,reject) => {
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject({
          latitude: 31.272788, longitude: 121.531894,     // 长阳创谷坐标
        })
      },
    })
  })
}

// 获取当前城市
export function getCity(latitude,longitude){
  return new Promise((resolve,reject) => {
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude, longitude: longitude,         // 实际坐标
        // latitude: 28.445751, longitude: 118.156586,       // 江西坐标（模拟）
      },
      success(res){
        resolve(res)
      },
      fail(err){
        reject(err)
      }
    })
  })
}
