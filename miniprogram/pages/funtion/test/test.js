import {getPhoneNumber} from "../../../utils/getPhoneNumber";
import {createUserRecord,getUserInfoByUnionid,getMediaId,initMediaId,addConsult,initActivity} from '../../../api/api'
import {data} from '../../../utils/data'

Page({
  data: {
    openid: "ojMwb5BrHJXAm0CBpohT0es9hq9k",
    session_key: null,
  },
  onLoad: function (options) {
    this.dialog = this.selectComponent("#dialog");
    getApp().getUser().then(res => {
      console.log(res)
      let a = getApp().globalData.userInfo
      console.log(a)
    }).catch(err => {
      console.log(err)
    })
  },
  onShow(){

  },

  getQRCode(){
    wx.cloud.callFunction({
      name: 'getQRCode',
      data: {
        scene: 'scene',
        page: 'pages/index/index',
        width: 180
      }
    }).then(res => {
      console.log(res)
      let qr = "data:image/png;base64," + wx.arrayBufferToBase64(res.result)
      console.log(qr)

    })
  },



  initActivity(){
    data.content.forEach(item => {
      initActivity(item).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    })
  },

  // 新增咨询
  addConsult(){
    let params = {remark:'123123'}
    addConsult(params).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },

  // 从数据库获取媒体id
  getMediaId(){
    getMediaId().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },

  // 初始化媒体id
  initMediaId(){
    initMediaId().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },

  // 更新用户
  updateUser(){
    getApp().updateUserInfoByUnionid().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },

  getUserInfoByUnionid(params){
    getUserInfoByUnionid(params).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  formSubmit: function (e) {
    let formId = e.detail.formId;
    let params = {
      name: 'openapi',
      data: {
        action: 'sendTemplateMessage',
        formId: e.detail.formId,
        session_key: this.data.session_key
      },
      // eslint-disable-next-line
    }
    wx.cloud.callFunction(params).then((res) => {
      this.setData({
        sendTemplateMessageResult: res,
        sendTemplateMessageLoading: false,
      })
      console.log('[云调用] [发送模板消息] 成功: ', res)
    }).catch(err => {
      this.setData({
        sendTemplateMessageError: true,
        sendTemplateMessageLoading: false,
      })
      console.error('[云调用] [发送模板消息] 失败: ', err)
    })
  },


  book2(){
    wx.requestSubscribeMessage({
      tmplIds: ['0ViI_X3JdzmZWqDqz0iJJgk72PxkJybHU_4SLO-HH8o','3RnhlpV7Bv25XeBGQHA4yG4OlNaCiGZxWzCoqRus5Qs','tbGgDEx2cCCMiR3LVrz0_QIV0QHXTpBxvp6P281Z77I'],
      success (res) {
        console.log(res)
      },
      fail(err){
        console.log(err)
      }
    })
  },

  book3(){
    wx.requestSubscribeMessage({
      tmplIds: ['_UkaWZvc7GOid4wDPNEEasZAHiCJT6E_pN26nvMHc0g'],
      success (res) {
        console.log(res)
      },
      fail(err){
        console.log(err)
      }
    })
  },


  book4(){
    wx.requestSubscribeMessage({
      tmplIds: ['0ViI_X3JdzmZWqDqz0iJJgk72PxkJybHU_4SLO-HH8o'],
      success (res) {
        console.log(res)
      },
      fail(err){
        console.log(err)
      }
    })
    wx.requestSubscribeMessage({
      tmplIds: [''],
      success (res) { }
    })
  },
  sort(arr){
    for(var j=0;j<arr.length-1;j++){
      //两两比较，如果前一个比后一个大，则交换位置。
      for(var i=0;i<arr.length-1-j;i++){
        if(arr[i]>arr[i+1]){
          var temp = arr[i];
          arr[i] = arr[i+1];
          arr[i+1] = temp;
        }
      }
    }
    return arr
  },
  sort2(arr,key){
    for(var j=0;j<arr.length-1;j++){
      //两两比较，如果前一个比后一个大，则交换位置。
      for(var i=0;i<arr.length-1-j;i++){
        if(arr[i][key]>arr[i+1][key]){
          var temp = arr[i];
          arr[i] = arr[i+1];
          arr[i+1] = temp;
        }
      }
    }
    return arr
  },

  arraySort(arr){
    //假设第0元素是有序序列，第1元素之后是无序的序列。从第1元素开始依次将无序序列的元素插入到有序序列中
    for(var i=1; i<arr.length;i++){
      if(arr[i]<arr[i-1]){
        //取出无序序列中需要插入的第i个元素
        var temp = arr[i];
        //定义有序中的最后一个位置
        var j = i-1;
        arr[i] = arr[j];
        //比较大小，找到插入的位置
        while(j>=0&&temp<arr[j]){
          arr[j+1] = arr[j];
          j--;
        };
        //插入
        arr[j+1] = temp;
      }
    }
    return arr
  },


  getPhoneNumber(e){
    let session_key = getApp().globalData.session_key;
    getPhoneNumber(e,session_key).then(res => {
      console.log(res)
      this.setData({mobile:res.phoneNumber})
    }).catch(err => {
      console.log(err)
    })
  },



  addUser(){
    let params = {
      userName:"1112",
      phone:123123,
      status: 1,
      role: null,
      remark: null,
      location:{longitude:121,latitude:31},
      creatTime: new Date().getTime(),
      updateTime: new Date().getTime(),
    }
    createUserRecord(params).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },

  getUser(){
    getApp().getUserInfo().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },

  upload(){
    wx.cloud.callFunction({
      name: 'uploadTempMedia',  // 对应云函数名
      data: {},
      success: res => {
        console.log(res)
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  showNotice(){
    this.dialog.showDialog();
  },

  _cancelEvent(){
    this.dialog.killDialog();

  },
  _confirmEvent(){
    clearInterval(this.data.countDown);
    this.dialog.killDialog();
    wx.redirectTo({
      url:"/pages/valet/valet-cancel/valet-cancel?mode=0"
    })
  },

})
