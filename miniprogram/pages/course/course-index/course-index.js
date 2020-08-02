import {data} from '../../../utils/data'
import {updateUserInfo} from '../../../api/api'
import {getPhoneNumber} from "../../../utils/getPhoneNumber";
Page({
  data: {
    mobile: null,
    tab:[
      {title:'小学课程',value:''},
      {title:'幼小课程',value:''},
      {title:'服务流程',value:''}
    ],
    tabIndex:0,

    index: 0,
    // multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],
    course: null,
    courseId: null,
    courseName: null,
    courseDetail: null,

    multiArray: [[],[],[]],
    multiIndex: [0, 0, 0],
    pickValue: null,

    hasUserInfo:false,
    hasUserPhone:false,
  },

  onLoad(options) {
  },
  onShow(){
    // this.setData({multiArray: data.primary})
    if(getApp().globalData.courseIndex){
      let tabIndex = getApp().globalData.courseIndex;
      this.setData({tabIndex})
    }

    console.log(this.data.tabIndex)

    this.tabSelect();
    this.getList();


    // 用户记录是否有用户信息
    getApp().getUser().then(res => {
      console.log(res)

      if(!res[0].nickName){
        this.setData({hasUserInfo:false});
      }
      if(!res[0].phone){
        this.setData({hasUserPhone:false});
      }

      console.log('this.data.hasUserInfo',this.data.hasUserInfo)
      console.log('this.data.hasUserPhone',this.data.hasUserPhone)

    }).catch(err => {
      console.log(err)
    });

    getApp().globalData.courseIndex = null;


    // 获取session
    getApp().getSession().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  getUser(){

  },

  tabSelect(e){
    let index
    if(e){
      index = Number(e.currentTarget.dataset.index);
    }else{
      index = 0
    }

    this.setData({tabIndex:index});
    switch(index){
      case 0:
        this.setData({course: data.primary});
        break;
      case 1:
        this.setData({course: data.infants});
        break;
      case 2:
        this.setData({course: data.process});
        break;
    }
    this.getList();
    this.setData({pickValue:null})
    // console.log('this.data.course',this.data.course)
  },

  // 填充课程列表
  getList(){
    let indexArray = this.data.multiIndex;
    let multi0 = [];
    let multi1 = [];
    let multi2 = [];

    this.data.course.forEach(item => {
      multi0.push(item.name)
    });
    this.data.course[indexArray[0]].children.forEach(item => {
      multi1.push(item.name)
    });
    this.data.course[indexArray[0]].children[indexArray[1]].children.forEach(item => {
      multi2.push(item.name)
    });
    let multiArray = [multi0,multi1,multi2]
    this.setData({multiArray})
  },

  // 填充课程详情
  getDetail(){
    let id = this.data.courseId;
    data.course.forEach(item => {
      if(item.id === id){
        this.setData({courseDetail:item})
      }
    })
  },


  // 选择学科
  bindMultiPickerChange: function (e) {
    let indexArray = e.detail.value;
    let course = this.data.course;
    this.setData({multiIndex: indexArray});

    let obj = course[indexArray[0]].children[indexArray[1]].children[indexArray[2]];
    let level1 = course[indexArray[0]].name;
    let level2 = course[indexArray[0]].children[indexArray[1]].name;
    let level3 = course[indexArray[0]].children[indexArray[1]].children[indexArray[2]].name;
    let pickValue = `${level1} > ${level2} > ${level3}`;
    console.log('pickValue',)
    this.setData({
      courseId: obj.id,
      courseName: obj.name,
      pickValue
    })
    this.getDetail();
    console.log('obj',obj)
  },

  // 波动轮盘
  bindMultiPickerColumnChange(e){
    let multiIndex = this.data.multiIndex;
    let column = e.detail.column;
    let value = e.detail.value;
    console.log(column,value)
    multiIndex[column] = value;
    this.setData({multiIndex})

    console.log('this.data.multiIndex',this.data.multiIndex)
    this.getList();
  },

  // 获取用户昵称
  getUserInfo(e){
    if(e.detail.rawData){
      this.setData({hasUserInfo:true});
      let obj = JSON.parse(e.detail.rawData);
      console.log(obj)
      let params = {
        nickName: obj.nickName,
        gender: obj.gender,
        avatarUrl: obj.avatarUrl
      }
      updateUserInfo(params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },

  // 获取用户手机
  getPhoneNumber(e){
    // if(this.data.hasUserPhone){
    //   getApp().toast("已发送服务请求")
    //   return false;
    // }
    let session_key = getApp().globalData.session_key;
    getPhoneNumber(e,session_key).then(res => {
      // getApp().globalData.userInfo.phone = res.phoneNumber
      console.log(res)
      let params = {
        phone: res.phoneNumber,
      };
      updateUserInfo(params).then(res => {
        this.setData({hasUserPhone:true})
        getApp().toast("已发送服务请求")
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })
  },

  knowMore(){
    getApp().toast("已发送服务请求")
  },


})
