import {env} from 'config'
import {getLocation} from 'utils/locate'
App({
  globalData:{
    code: null,
    openid: null,
    unionid: null,
    session_key: null,

    userInfo: null,

    courseIndex: null,
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: env === 'dev' ? 'dev' : 'prod',
        traceUser: true,
      })
    }
    this.getScene().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    });
  },

  getScene(){
    return new Promise((resolve,reject) => {
      resolve(wx.getLaunchOptionsSync().scene)
    })
  },

  login(){
    return new Promise((resolve, reject) => {
      resolve()
    })
  },


  // 获取用户信息，有用户读取用户，新用户新建用户
  getUser(){
    return new Promise((resolve,reject) => {
      if(getApp().globalData.userInfo){
        resolve()
      }else{
        this.getUserInfo().then(res => {
          if(res.length > 0){
            getApp().globalData.userInfo = res[0];
            resolve(res)
          }else{
            console.log(new Date().getTime())
            // getLocation().then(res => {
            //   console.log(new Date().getTime())
            //   let position = {
            //     latitude: res.latitude,
            //     longitude: res.longitude
            //   }
            //   this.createUser(position).then(res => {
            //     resolve(res)
            //   }).catch(err => {
            //     reject(err)
            //   })
            // }).catch(err => {
            //   console.log(err)
            // })
            this.createUser(position).then(res => {
              resolve(res)
            }).catch(err => {
              reject(err)
            })
          }
        }).catch(err => {
          reject(err)
        })
      }
    })
  },


  // 获取session_key
  getSession(){
    return new Promise((resolve,reject) => {
      if(getApp().globalData.openid) resolve();
      wx.login({
        success(res){
          wx.cloud.callFunction({
            name: 'getSession',  // 对应云函数名
            data: {
              js_code:res.code
            },
            success: res => {
              getApp().globalData.openid = res.result.openid;
              getApp().globalData.unionid = res.result.unionid;
              getApp().globalData.session_key = res.result.session_key;
              resolve(res.result)
            },
            fail: err => {
              reject(err.errMsg)
            }
          })
        },
        fail(err){
          reject(err.errMsg)
        }
      })
    })
  },

  updateUserInfoByUnionid(){
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'api',
        data: {
          name:'updateUserInfoByUnionid',
          unionid : getApp().globalData.unionid
        },
        success: res => {
          resolve(res.result)
        },
        fail: err => {
          reject(err.errMsg)
        }
      })
    })
  },

  getUserInfo(){
    return new Promise((resolve,reject) => {
      wx.cloud.callFunction({
        name: 'api',
        data: {
          name:'getUserInfoByUnionid',
        },
        success: res => {
          if(res.result.code === 200){
            resolve(res.result.data)
          }else{
            reject(res)
          }
        },
        fail: err => {
          reject(err.errMsg)
        }
      })
    })
  },

  // 获取用户授权
  getUserAuth(){
    return new Promise((resolve,reject) => {
      if(getApp().globalData.userInfo.nickName){
        resolve(getApp().globalData.userInfo)
      }
      wx.getSetting({
        success (res){
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function(res) {
                resolve(res.userInfo)
              },
              fail(err){
                reject(err)
              }
            })
          }else{
            reject(res)
          }
        },
        fail(err){
          reject(err)
        }
      })
    })
  },

  getStorage(key){
    return new Promise((resolve,reject) => {
      wx.getStorage({
        key: key,
        success (res) {
          resolve(res.data)
        },
        fail(err){
          reject(err)
        }
      })
    })
  },

  setStorage(key,data){
    return new Promise((resolve,reject) => {
      wx.setStorage({
        key:key,
        data:data,
        success (res) {
          resolve(res)
        },
        fail(err){
          reject(err)
        }
      })
    })
  },


  createUser(){
    return new Promise((resolve,reject) => {
      wx.cloud.callFunction({
        name: 'api',
        data: {
          name:'createUserRecord',
        },
        success: res => {
          if(res.result.code === 200){
            resolve(res.result.data)
          }else{
            reject(res)
          }
        },
        fail: err => {
          reject(err.errMsg)
        }
      })
    })
  },




  getCode(){
    return new Promise((resolve,reject) => {
      wx.login({
        success(res){
          resolve(res.code)
        },
        fail(err){
          reject(err.errMsg)
        }
      })
    })
  },

  // 获取手机号
  getPhoneNumber(e){
    wx.cloud.callFunction({
      name: 'getPhoneNumber',  // 对应云函数名
      data: {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        sessionCode: getApp().globalData.sessionCode    // 这个通过wx.login获取，去了解一下就知道。这不多描述
      },
      success: res => {
        wx.hideLoading()
        // 成功拿到手机号，跳转首页
        wx.switchTab({
          url: '../index/index' // 这里是要跳转的路径
        })
      },
      fail: err => {
        console.error(err);
        wx.showToast({
          title: '获取手机号失败',
          icon: 'none'
        })
      }
    })
  },


  // 轻提示
  toast(text, time, icon) {
    wx.showToast({
      icon: icon || 'none',
      title: text || '',
      duration: time * 1000 || 3000,
    });
  },

})
