import {data} from '../../../utils/data'
Page({
  data: {
    scene: 1001,
    id: null,
    item:{}
  },

  onLoad(options){
    console.log('options',options)
    if(!options.id) return false;
    this.setData({id:options.id})
    data.teacher.forEach(item => {
      if(item.id === options.id){
        this.setData({item})
      }
    })
    console.log(123)
    console.log(this.data.item)
  },
  onShow(){
    // let a = wx.getLaunchOptionsSync();
    // console.log(a)
    getApp().getScene().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },

  moreTeacher(){
    wx.switchTab({
      url: '/pages/teacher/teacher-index/teacher-index'
    })
  },

  onShareAppMessage(res){
    // if (res.from !== 'button') return false;
    let id = this.item.id;
    let name = this.item.name;
    return {
      title: `嗨！向您推荐一位象上小学生的名师${name}老师`,
      path: `/pages/teacher/teacher-detail/teacher-detail?id=${id}`,
      imageUrl:`/images/teacher/${name}`
    }
  },

})
