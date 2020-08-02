import {subKey} from '../../../config'
import {data} from '../../../utils/data'
import {getDistance} from '../../../utils/utils'
import {getLocation,getCity} from '../../../utils/locate'
Page({
  data: {
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

  pageInit(){
    this.setData({
      navigationFlag:true
    })
  },

  getMarkers(){
    let markers = [];
    let nowPoint = {
      latitude:this.data.latitude,
      longitude:this.data.longitude
    };
    console.log('nowPoint',nowPoint)

    data.centre.forEach((item,index) => {
      let markerObj = {
        name: item.name,
        address: item.address,
        phone: item.phone,

        iconPath: "/images/icon_map.png",
        id: index,
        latitude: item.latitude,
        longitude: item.longitude,
        width: 30,
        height: 30,
        distance:getDistance(nowPoint,item),

        callout: {
          content: item.name,
          fontSize: 10,
          padding: 5,
          borderRadius: 15,
          bgColor: '#000000AA',
          color: '#ffffff',
          display: 'BYCLICK'
        },
      };

      markers.push(markerObj)
    });
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

  //
  markertap(e){
    let index = e.markerId;
    this.setData({
      labelShow:true,
      selectMarker:this.data.markers[index]
    });
    console.log(this.data.selectMarker)
    console.log(e)
  },

  mapTap(){
    this.setData({
      labelShow:false
    });
  },

  // 地图导航
  navigation() {
    if (this.data.navigationFlag === true) {
      this.setData({
        navigationFlag: false
      })
      let obj = this.data.selectMarker;
      let lat = obj.latitude; // 获取点击的markers经纬度
      let lon = obj.longitude; // 获取点击的markers经纬度
      let name = obj.name; // 获取点击的markers名称
      let address = obj.address;
      wx.openLocation({
        latitude: lat,
        longitude: lon,
        name: name,
        address: address,
        success: function (res) { },
        fail: function (res) { }
      })
    }
  },
  // 联系校区
  contactCentre(){
    wx.makePhoneCall({
      phoneNumber: this.data.selectMarker.phone
    })
  },

  showDetail(){
    getApp().toast("校区资料不足，暂未开通")
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
