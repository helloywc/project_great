Component({
  properties: {
    tabs:{
      type:Array,
      value:["页签1", "页签2"]
    },
    activeIndex:{
      type:Number,
      value:0
    },
    isFixed:{
      type:Boolean,
      value:false
    },

  },
  data: {
    sliderOffset: 0,
    sliderLeft: 0,
  },

  ready(){
    this.setData({
      sliderOffset: this.properties.activeIndex * 750/ this.properties.tabs.length,
      activeIndex: this.properties.activeIndex
    });
  },


  methods: {
    tabClick: function (e) {
      this.setData({
        sliderOffset: e.currentTarget.id * 750 / this.properties.tabs.length,
        activeIndex: e.currentTarget.id
      });
      var params = { pickerShow: false, type: 'cancel',activeIndex:this.properties.activeIndex } // detail对象，提供给事件监听函数
      this.triggerEvent('myevent', params) //myevent自定义名称事件，父组件中使用
    },
    setIndex(number){
      this.setData({activeIndex:number});
      this.triggerEvent('setIndex', number) //myevent自定义名称事件，父组件中使用
    },
    linkage(index){
      this.setData({
        sliderOffset: index * 750 / this.properties.tabs.length,
        activeIndex: index
      });
    }
  }
})
