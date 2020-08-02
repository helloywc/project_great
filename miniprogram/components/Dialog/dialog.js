Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {

    // 弹窗标题
    title:{type:String,value: '标题'},

    // 是否用户自定义内容
    isCustom:{type:Boolean,value:false},

    // 弹窗内容
    content:{type:String,value:'弹窗内容'},

    // 弹窗取消按钮文字
    cancelText:{type:String,value:'取消'},

    // 弹窗确认按钮文字
    confirmText:{type:String,value:'确定'},

    // 是否有取消
    hasCancel:{type:Boolean,value:true},

    // 是否是关注客服
    isContact:{type:Boolean,value:false},

  },
  data: {
    // 弹窗显示控制
    isShow:false
  },

  methods: {
    /*
     * 公有方法
     */
    //隐藏弹框
    killDialog(){
      this.setData({
        isShow: false
      })
    },

    //隐藏弹框
    hideDialog(){
      this.setData({
        isShow: false
      })
    },
    //展示弹框
    showDialog(){
      this.setData({
        isShow: true
      })
    },
    /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件
    */
    _cancelEvent(){
      //触发取消回调
      this.triggerEvent("cancelEvent")
    },
    _confirmEvent(){
      //触发成功回调
      this.triggerEvent("confirmEvent");
    }
  }
})
