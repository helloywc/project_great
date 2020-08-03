Page({
  data: {
    title: "",
    ticket: false,
    btnName: "",
    phone: "17621627660"
  },

  onLoad(){

  },
  onShow(){
    this.getStatus();
  },
  onShareAppMessage(res){
    return {
      title: "偷偷塞你一张优惠券，来一起薅羊毛吧！",
      path: '/pages/activity/activity',
      imageUrl: "/images/share2.jpg"
    }
  },
  getStatus(){
    const _this = this;
    wx.getStorage({
      key: "ticket",
      success(res){
        console.log('res',res)
        if(res.data){
          _this.setFalse();
        }else{
          _this.setTrue();
        }

      },
      fail(err){
        console.log(err)
        _this.setTrue();
      }
    })
  },
  getNow(){
    if(this.data.ticket === false) return false;
    let _this = this;
    wx.setStorage({
      key: "ticket",
      data: true,
      success(res){
        console.log('res',res)
        wx.showToast({title:"领取成功",icon: "success"})
        _this.setFalse();
      },

    })
  },

  contactMe(){
    let phone = this.data.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },

  setFalse(){
    this.setData({ticket: false,btnName: "已领取"})
  },
  setTrue(){
    this.setData({ticket: true,btnName: "立即领取"})
  },

  copyWechat(){
    let phone = this.data.phone;
    wx.setClipboardData({
      data: phone,
      success (res) {
        wx.getClipboardData({
          success (res) {
            wx.showToast({title:"复制成功",icon: "success"})
          }
        })
      }
    })
  }



})
