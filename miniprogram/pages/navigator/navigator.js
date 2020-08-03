import {subKey} from '../../config'
import {data} from '../../utils/data'
import {getDistance} from '../../utils/utils'
import {getLocation,getCity} from '../../utils/locate'
Page({
  data: {
    target: {
      name: "格力特体育公园",
      address: "上海市宝山区长江路735-5 博绣荟文创园内",
      phone: "17621627660",

      iconPath: "/images/icon_map.png",
      latitude: 31.342514,
      longitude: 121.468696,
    },
    subKey: subKey,
    latitude: null,
    longitude: null,
    markers: [],
    selectMarker:{},
    labelShow:false,


    navigationFlag:true
  },

  onLoad(){

  },
  onShow(){
    this.getLocation();

  },
  onShareAppMessage(res){
    return {
      title: "老司机已经在路上了，你呢？",
      path: '/pages/navigator/navigator',
      imageUrl: "/images/share2.jpg"
    }
  },

  pageInit(){
    this.setData({
      navigationFlag:true
    })
  },

  getMarkers(){
    const target = this.data.target;
    let markerObj = {
      name: target.name,
      address: target.address,
      phone: target.phone,

      iconPath: "/images/logo.png",
      latitude: target.latitude,
      longitude: target.longitude,
      width: 30,
      height: 30,

      // callout: {
      //   fontSize: 10,
      //   padding: 5,
      //   borderRadius: 15,
      //   bgColor: '#000000AA',
      //   color: '#ffffff',
      //   display: 'BYCLICK'
      // },
    };
    let markers = [markerObj];
    let nowPoint = {
      latitude:this.data.latitude,
      longitude:this.data.longitude
    };
    console.log('nowPoint',nowPoint)

    this.setData({markers})
  },

  getLocation(){
    getLocation().then(res => {
      let latitude = res.latitude;
      let longitude = res.longitude;
      this.setData({latitude,longitude});

      this.getMarkers();
      this.pageInit();

      getCity(latitude,longitude).then(res2 => {
        console.log(res2)
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })
  },
  regionchange(e){
    if(e.type === 'begin') return false;
    console.log(e)

    let _this = this;
    this.mapCtx = wx.createMapContext("map4select");
    this.mapCtx.getCenterLocation({
      type: 'gcj02',
      success(res){
        // _this.getStationList(res.longitude,res.latitude);
      },
      fail(res){
      },
    })
  },


  // 地图导航
  navigation() {
    let target = this.data.target;
    wx.openLocation({
      latitude: target.latitude,
      longitude: target.longitude,
      name: target.name,
      address: target.address,
      success: function (res) { },
      fail: function (res) { }
    })
  },
  // 联系校区
  contactCentre(){
    const target = this.data.target;
    wx.makePhoneCall({
      phoneNumber: target.phone
    })
  },

  showDetail(){
    getApp().toast("尚未开通，敬请期待")
  },

  // 寻找最近
  searchNearby(){
    this.searchNearbyNext();
    // getApp().toast("功能暂未开通，敬请期待")
  },

  searchNearbyNext(){
    let nowPoint = {
      latitude:this.data.latitude,
      longitude:this.data.longitude
    };

    let selectMarker =this.data.markers.sort((item1,item2) => item1.distance - item2.distance )[0];
    console.log('this.data.markers',this.data.markers);
    console.log('selectMarker',selectMarker)
    this.setData({selectMarker,labelShow:true})


  },


})
