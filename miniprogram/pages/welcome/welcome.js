Page({
  data: {
    timeline:null,
    count:4,
  },
  onLoad: function (options) {
    getApp().getUser().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  onShow(){
    this.timeline();
  },
  timeline(){
    let _this = this;
    let count = this.data.count;
    this.data.timeline = setInterval(()=>{
      count --;
      if(count >= 0){
        _this.setData({count})
      }else{
        console.log(111)

        _this.goIndex();
        _this.clearTimeline();
      }
    },1000)
  },
  clearTimeline(){
    clearInterval(this.data.timeline);
  },
  goIndex(){
    console.log(123)
    this.clearTimeline();
    wx.switchTab({
      url:'/pages/hotspot/hotspot-index/hotspot-index'
    })
  },
  knowUs(){
    this.clearTimeline();
    wx.navigateTo({
      url:'/pages/present/present'
    })
  },
})
