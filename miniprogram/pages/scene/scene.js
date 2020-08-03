Page({
  data: {
    images:{},
    listData: [
      {
        title: "外观",
        image: "https://6465-dev-4m07d-1302776322.tcb.qcloud.la/%E5%AE%9E%E6%8B%8D%E5%9B%BE/00.jpg?sign=4df8fe83891b2917b06d2b045ff49ddb&t=1596378029",
        message:["丰富你的业余生活，我们可是认真的","羽毛球场地，篮球场地已经开始运营啦！"]
      },
      {title: "前台", image: "https://6465-dev-4m07d-1302776322.tcb.qcloud.la/%E5%AE%9E%E6%8B%8D%E5%9B%BE/02.jpg?sign=3500bb88e9b5722cfe2989a7700265a4&t=1596378057", message:["篮球场铺设双层龙骨实木地板，具备更好的防滑防震效果","IBA规格金陵篮球架使篮球体验更加卓越"]},
      {title: "俯视图", image: "https://6465-dev-4m07d-1302776322.tcb.qcloud.la/%E5%AE%9E%E6%8B%8D%E5%9B%BE/01.jpg?sign=05cacd8f3bc2a8d5c1f2ff5473fe71f5&t=1596378043", message:["高挑高羽球场地，侧面光源让视线持久舒适", "木质地板上铺设胶面，为每位馆内打羽毛球者提供最安全的保护"]},
      {title: "力量区", image : "https://6465-dev-4m07d-1302776322.tcb.qcloud.la/%E5%AE%9E%E6%8B%8D%E5%9B%BE/03.jpg?sign=042209f3377122842fe85ff3a8b33b00&t=1596378071",message:["可领取优惠券提前预约场地，开启难忘的体验之旅"]},
    ],
    messageBox:[],
    listIndex: -1,
    imgwidth:0,
    imgheight:0,
  },

  onLoad(){
    this.getFist();
  },
  onShow(){

  },
  onShareAppMessage(res){
    return {
      title: "发现一片好场地，来一起打球么！",
      path: '/pages/scene/scene',
      imageUrl: "/images/share2.jpg"
    }
  },
  imageLoad: function(e) {
    let _this=this;
    let $width=e.detail.width,    //获取图片真实宽度
      $height=e.detail.height,
      ratio=$width/$height;   //图片的真实宽高比例
    let viewWidth=750,           //设置图片显示宽度，
      viewHeight=750/ratio;    //计算的高度值
    _this.setData({
      imgwidth:viewWidth,
      imgheight:viewHeight
    })
  },
  swiperChange(e){
    let index = e.detail.current;
    let messages = this.data.listData[index].message;
    console.log(index)
    this.setData({
      listIndex: index,
      messageBox: messages
    });
  },
  getFist(){
    let messages = this.data.listData[0].message;
    this.setData({messageBox:messages})
  },
  showGallary(){
    let current = this.data.listData[this.data.listIndex].image;
    let urls = this.data.listData.map(item => item.image);
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  }


})
