Page({
  data: {
    images:{},
    listData: [
      {
        title: "外观",
        image: "https://6465-dev-4m07d-1302776322.tcb.qcloud.la/%E6%95%88%E6%9E%9C%E5%9B%BE/%E5%A4%96%E8%A7%82.jpg?sign=03d7afa6444439d085e8afb1cec7c294&t=1596376576",
        message:["深耕沪上全民体育20年，历经100天辛苦建造","慢工出细活，我们终于要完工啦^_^"]
      },
      {title: "俯视图", image: "https://6465-dev-4m07d-1302776322.tcb.qcloud.la/%E6%95%88%E6%9E%9C%E5%9B%BE/%E4%BF%AF%E8%A7%86%E5%9B%BE.jpg?sign=04022187fc0eb8113a1495fd32636409&t=1596376599", message:["4片立体喷绘纽约街头风室内篮球全场,23米全上海最高挑高,中央双LED大屏,IBA规格金陵篮球架,满足你一切你对篮球的体验!", "还有25片极限挑高大众室内羽毛球场!"]},
      {title: "前台", image: "https://6465-dev-4m07d-1302776322.tcb.qcloud.la/%E6%95%88%E6%9E%9C%E5%9B%BE/%E5%89%8D%E5%8F%B0.jpg?sign=3aaf9ca5221f17143e13a5383c1d91b9&t=1596376616", message:["配备：VIP休息室、大型OPEN咖啡吧","来这里，满足你对运动的所有想象"]},
      {title: "力量区", image : "https://6465-dev-4m07d-1302776322.tcb.qcloud.la/%E6%95%88%E6%9E%9C%E5%9B%BE/%E5%8A%9B%E9%87%8F%E5%8C%BA.jpg?sign=cb78d8ee2f4afaef2ac5814865ff71ef&t=1596376632",message:["3000平米美式工业风大型室内健身会所","包含各类瑜伽、操课、动感单车、有氧、力量、私教、VIP区域"]},
      {title: "体操室", image : "https://6465-dev-4m07d-1302776322.tcb.qcloud.la/%E6%95%88%E6%9E%9C%E5%9B%BE/%E4%BD%93%E6%93%8D%E5%AE%A4.jpg?sign=1f2480b427d6c5541410a7b5bc2e8c05&t=1596376645",message:["3000平米美式工业风大型室内健身会所","包含各类瑜伽、操课、动感单车、有氧、力量、私教、VIP区域"]},
      {title: "单车区", image : "https://6465-dev-4m07d-1302776322.tcb.qcloud.la/%E6%95%88%E6%9E%9C%E5%9B%BE/%E5%8D%95%E8%BD%A6%E5%8C%BA.jpg?sign=f008cd75d3d47843734a62312235d4b3&t=1596376659",message:["3000平米美式工业风大型室内健身会所","包含各类瑜伽、操课、动感单车、有氧、力量、私教、VIP区域"]},
      {title: "有氧区", image : "https://6465-dev-4m07d-1302776322.tcb.qcloud.la/%E6%95%88%E6%9E%9C%E5%9B%BE/%E6%9C%89%E6%B0%A7%E5%8C%BA.jpg?sign=5c69cd30dc9367d291dbcb3d6e6c6359&t=1596376678",message:["3000平米美式工业风大型室内健身会所","包含各类瑜伽、操课、动感单车、有氧、力量、私教、VIP区域"]},
      {title: "泳池", image : "https://6465-dev-4m07d-1302776322.tcb.qcloud.la/%E6%95%88%E6%9E%9C%E5%9B%BE/%E6%B3%B3%E6%B1%A0.jpg?sign=3394a42c2825f0c13fa968e745e6fbcb&t=1596378780",message:["名师设计，实用美观一体的阳光室内泳池"]},
      {title: "私教区", image : "https://6465-dev-4m07d-1302776322.tcb.qcloud.la/%E6%95%88%E6%9E%9C%E5%9B%BE/%E7%A7%81%E6%95%99%E5%8C%BA.jpg?sign=e58fd479d08c78eb514c8a0152c802c4&t=1596376692",message:["从爱好到专业 从个人到家庭","一站式体育综合服务 就在格力特"]},
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
      title: "来来来，游泳健身了解一下 o(*￣▽￣*)ブ",
      path: '/pages/project/project',
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
