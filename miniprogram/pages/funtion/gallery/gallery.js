Page({
  data: {
    galleryList:[
      {url:'https://static-files.ai-ways.com/wp-content/plugins/aiways-site-apps/homescreen/img/015.jpg',height:'',title:'111',message:'1313'}
      ,{url:'https://static-files.ai-ways.com/wp-content/plugins/aiways-site-apps/homescreen/img/02.jpg',height:'',title:'222',message:'2323'}
      ,{url:'https://static-files.ai-ways.com/wp-content/plugins/aiways-site-apps/homescreen/img/03.jpg',height:'',title:'333',message:'3333'}
      ,{url:'https://static-files.ai-ways.com/wp-content/plugins/aiways-site-apps/homescreen/img/04.jpg',height:'',title:'444',message:'4343'}
    ],
    galleryIndex: 0,
    imgwidth: null,
    imgheight: null
  },

  onLoad: function (options) {

  },

  imageLoad: function(e) {
    let index = Number(e.currentTarget.dataset.index);
    var width = e.detail.width; //获取图片真实宽度
    var height = e.detail.height; //获取图片真实高度
    let key = `galleryList[${index}].height`;
    this.setData({[key]: height / width * 750});
  },

  swiperChange(e){
    let index = Number(e.detail.current);
    this.setData({galleryIndex:index});
  },
})
