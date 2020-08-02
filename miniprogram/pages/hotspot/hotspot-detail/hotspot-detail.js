import {data} from '../../../utils/data'
Page({
  data: {
    id: null,
    obj:{},
  },

  onLoad(options){
    let id = options.id;
    this.setData({id});
    this.getData();
  },
  onShow(){

  },

  getData(){
    data.content.forEach(item => {
      if(String(item.id) === this.data.id){
        this.setData({obj:item})
      }
    })
  }
})
