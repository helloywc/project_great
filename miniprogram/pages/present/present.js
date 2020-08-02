import {getPhoneNumber} from "../../utils/getPhoneNumber";
import {updateUserInfo,addConsult} from "../../api/api";
import {format} from '../../utils/date'

Page({
  data: {
    tabTitle:['类型','学科','年级'],
    tab:[
      {name:'小升初',select:false,children:{
          grade:[
            {name:'一年级',select:false},
            {name:'二年级',select:false},
            {name:'三年级',select:false},
            {name:'四年级',select:false},
            {name:'五年级',select:false},
            {name:'预备班',select:false},
            ],
          subject:[
            {name:'全科',select:false},
            {name:'语文',select:false},
            {name:'数学',select:false},
            {name:'英语',select:false},
          ],
        }},
      {name:'幼升小',select:false,children:{
          grade:[
            {name:'中班',select:false},
            {name:'大班',select:false},
          ],
          subject:[
            {name:'全科',select:false},
            {name:'语文',select:false},
            {name:'数学',select:false},
            {name:'英语',select:false},
          ],
        }},
      {name:'择校',select:false,children:{
          grade:[
            {name:'择校',select:false},
          ],
          subject:[
            {name:'择校',select:false},
          ],
        }},
    ],
    tabIndex1:0,
    tabIndex2:0,
    tabIndex3:0,


    swiperIndex:0,

    hasUserInfo:false,
    hasUserPhone:false,
  },

  onLoad(options){

  },
  onShow(){

  },
  goPage(e){
    let index = Number(e.currentTarget.dataset.index);
    this.setData({swiperIndex:index})
  },

  // 前往教学服务
  goService(){
    getApp().globalData.courseIndex = 2;
    wx.switchTab({
      url:'/pages/course/course-index/course-index'
    })
  },

  // 前往课程
  goCourse(){
    getApp().globalData.courseIndex = 0;
    wx.switchTab({
      url:'/pages/course/course-index/course-index'
    })
  },

  goTeacher(){
    wx.switchTab({
      url:'/pages/teacher/teacher-index/teacher-index'
    })
  },

  goCentre(){
    wx.switchTab({
      url:'/pages/centre/centre-index/centre-index'
    })
  },

  goNext(){
    let index = this.data.swiperIndex + 1 ;
    this.setData({swiperIndex:index})
  },

  tapSelect(e){
    let index = Number(e.currentTarget.dataset.index);
    let newTab = this.data.tab;
    newTab.forEach(item => {item.select = false});
    newTab[index].select = true;
    this.setData({tab:newTab});
    this.setData({tabIndex1:index})

    // // 选择类型
    // if(e.currentTarget.dataset.index === 0){
    //   this.setData({tabIndex1:index})
    // }
  },

  tapSelect2(e){
    let index = Number(e.currentTarget.dataset.index);
    let newTab = this.data.tab;

    newTab[this.data.tabIndex1].children.subject.forEach(item => {item.select = false});
    newTab[this.data.tabIndex1].children.subject[index].select = true;
    this.setData({tab:newTab});
    this.setData({tabIndex2:index})
  },

  tapSelect3(e){
    let index = Number(e.currentTarget.dataset.index);
    let newTab = this.data.tab;
    newTab[this.data.tabIndex1].children.grade.forEach(item => {item.select = false});
    newTab[this.data.tabIndex1].children.grade[index].select = true;
    this.setData({tab:newTab});
    this.setData({tabIndex3:index})
  },

  // 来联系我
  contactMe(){
    let data = this.data;
    let remark = `${data.tab[data.tabIndex1].name} + ${data.tab[data.tabIndex1].children.grade[data.tabIndex2].name} + ${data.tab[data.tabIndex1].children.subject[data.tabIndex3].name}`
    let params = {
      remark: remark,
      time: format(new Date())
    }
    console.log('params',params)
    addConsult(params).then(res => {
      wx.showToast({title:"预约成功",icon:"success",mask:true})
      let _this = this;
      setTimeout(()=>{
        _this.goIndex();
      },2000)
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },


  goIndex(){
    wx.switchTab({
      url:'/pages/hotspot/hotspot-index/hotspot-index'
    })
  },

  getPhoneNumber(e){
    console.log(e)
    let session_key = getApp().globalData.session_key;
    getPhoneNumber(e,session_key).then(res => {
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
  bindchange(e){
    let index = Number(e.detail.current);
    this.setData({swiperIndex:index});
  }
})
