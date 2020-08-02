import {data} from '../../../utils/data'
Page({
  data: {
    // tabs: ["语文", "数学", "英语"],
    tabs: [
      {title:"语文",value:"chinese"},
      {title:"数学",value:"maths"},
      {title:"英语",value:"english"},
    ],
    activeIndex: 0,
    teacher: data.teacher,
  },

  onLoad(options){
    this.tab = this.selectComponent("#tab");
    this.list = this.selectComponent("#list");
  },
  onShow(){
    // this.setData({teacher:data.teacher})
    console.log(this.data.teacher)
  },

  // 页签切换
  toggleToast(e){
    let index = Number(e.detail.activeIndex);
    console.log('index',index);
    this.setData({activeIndex:index,orderList:[],tabIndex:index});
    // this.list.pageInit();
    // this.getList();
  },


  goTeatchDetail(){
    console.log(123)
  },

  swiperChange(e){
    let index = e.detail.current;
    this.setData({activeIndex:index});
    this.tab.linkage(index);
  },

})
