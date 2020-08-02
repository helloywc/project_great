import {data} from '../../../utils/data'
import {format3} from '../../../utils/date'
Page({
  data: {
    tabs:[
      {title:'热点',value:'hot'},
      {title:'优惠',value:'discount'},
      {title:'活动',value:'activity'},
      {title:'教学',value:'education'},
      {title:'习惯',value:'habit'},
      {title:'资讯',value:'policy'},
      {title:'解读',value:'decode'},
      {title:'题库',value:'topic'},
      {title:'测评',value:'exam'},
      {title:'择校',value:'choose'},


      // {title:'资讯',value:'information'},
    ],
    tabIndex:0,
    duration:500,
    toView: 'green',

    // 活动内容列表
    contentList:[

    ],

    contactShow:false,
    noticeShow:false,
  },

  onLoad(){
    this.dialog = this.selectComponent("#dialog");
  },

  onShow(){
    this.getList();
    this.getStorage();
  },

  getStorage(){
    getApp().getStorage('attention').then(res => {
      console.log(res)
      if(res){
        this.setData({contactShow:true})
      }
    }).catch(err => {
      getApp().setStorage('attention',true).then(res => {
        this.setData({contactShow:true})
      }).catch(err => {
        console.log(err)
      })
      console.log(err)
    })
  },

  getList(){
    let newData = data.content;
    newData.forEach(item => {
      item.time = format3(item.publishTime);
      let nowTime = new Date().getTime();
      let startDate = new Date(item.startDate).getTime();               // 开始时间
      let endDate = new Date(item.endDate).getTime();                   // 结束时间
      let enrollStartDate = new Date(item.enrollStartDate).getTime();   // 报名开始时间
      let enrollEndDate = new Date(item.enrollEndDate).getTime();       // 报名结束时间


      if(nowTime > startDate && nowTime < endDate){
        item.status = 1     // 进行中
      }else if(nowTime > enrollStartDate && nowTime < enrollEndDate){
        item.status = 2     // 报名中
      }else if(nowTime > endDate){
        item.status = 0     // 已结束
      }

    })
    console.log('newData',newData)
    this.setData({contentList:newData});
  },

  tabSelect(e){
    let tabIndex0 = this.data.tabIndex;
    let tabIndex = Number(e.currentTarget.dataset.index);

    if(tabIndex > tabIndex0 + 1  || tabIndex < tabIndex0 - 1){
      this.setData({duration:0})
    }else if(tabIndex === tabIndex0){
      return
    }else{
      this.setData({duration:500})
    }

    this.setData({tabIndex})

  },

  swiperChange(e){
    let index = Number(e.detail.current);
    this.setData({tabIndex:index});
  },

  swiperChangeFinish(e){
    console.log(e)
    let tabs = this.data.tabs;
    tabs.forEach(item => item.hidden = false);
    this.setData({tabs})
    console.log('this.data.tabs[after]',this.data.tabs)
  },

  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  scroll(e) {
    console.log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },

  goHotspotDetail(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:'/pages/hotspot/hotspot-detail/hotspot-detail?id=' + id
    })
  },

  clearContact(){
    getApp().setStorage('attention',false).then(res => {
      this.setData({contactShow:false})
    })
  },

  showNotice(){
    console.log('this.dialog',this.dialog)
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
