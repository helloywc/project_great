Component({
  options:{
    multipleSlots: true
  },
  properties: {
    text:{
      type:String,
      value:'没有任何数据记录'
    },
    imgUrl:{
      type:String,
      value:'https://7765-weixin-ruqmk-1258718101.tcb.qcloud.la/image/common_nocomment.png?sign=26f819e3f52ea9932552b133c3404542&t=1563431338'
    },
    cardHeight:{
      type:Number,
      value:500
    },
    size:{
      type:String,
      value:'normal'
    },
    noLast:{
      type:Boolean,
      value:false
    }
  },
  data: {
    face:'>_<',
    loading1:false,
    loading2:false,
    loading3:false,

    loadingFlag1:true,
    loadingFlag2:true,

    noData:false,
    pageSize:20,

    isError:false,
    length:'',
    isLast:false,

    pageY:'',
    isPage0:true
  },
  methods: {

    // 初始化
    pageInit(){
      this.setData({
        isLast:false,
        noData:false,
        isError:false,
        isPage0:true
      })
    },

    // 下拉刷新
    toUpper(e){
      this.pageInit();
      if(!this.data.loadingFlag1){
        return false
      }
      this.showLoading3();
      this.setData({
        isError:false,
        loadingFlag1:false,
        isLast:false
      });
      this.triggerEvent('upper')
    },

    // 上拉加载
    toLower(e){
      if(!this.data.loadingFlag2){
        return false
      }
      if(this.data.isLast){
        return false
      }
      this.setData({
        isError:false,
        loadingFlag2:false,
        isLast:false
      });
      this.triggerEvent('lower')
    },

    // 显示下拉刷新的loading
    showLoading1(){
      if(this.data.loadingFlag1){
        this.setData({loading1:true})
      }
    },

    // 显示上拉加载的loading
    showLoading2(){
      if(this.data.loadingFlag2){
        this.setData({
          loading2:true,
        })
      }
    },

    // 显示上拉加载的loading
    showLoading3(){
      // wx.showLoading({
      //   title: '加载中',
      // });

    },

    // 取消loading
    cancalLoading(){
      let _this = this;
      setTimeout(()=>{
        _this.setData({
          loading1:false,
          loading2:false
        });
        wx.hideLoading();
      },1000)
    },

    // 判断是否没有数据
    isEmpty(length){
      let _this = this;
      if(length === 0){
        setTimeout(()=>{
          _this.setData({
            noData:true
          })
          wx.hideLoading();
        },1000);
      }else {
        this.setData({
          noData:false
        })
      }

    },

    // 判断是否出错
    isError(){
      let _this = this;
      setTimeout(()=>{
        _this.setData({
          isError:true
        });
        wx.hideLoading();
      },1000);
    },

    // 入参判断 sec为刷新频率，默认0
    judge(res,sec){
      return new Promise((resolve, reject) => {
        let _this = this;
        // 没有响应，失败
        if(!res){
          console.log('失败');
          this.isError();
          reject(res)
          return false
        }

        // 有报错，失败
        if(res.error){
          console.log('失败');
          this.isError();
          reject(res)
          return false
        }

        // if(res.code){
        //   if(res.code != 0){
        //     console.log('失败');
        //     this.isError();
        //     reject(res)
        //     return false
        //   }
        // }
        if(res.errorId){
          console.log('失败');
          this.isError();
          reject(res)
          return false
        }

        if(sec){
          setTimeout(()=>{
            _this.setData({
              loadingFlag1:true,
              loadingFlag2:true,
            })
          },sec * 1000)
        }else{
          this.setData({
            loadingFlag1:true,
            loadingFlag2:true,
          })
        }

        this.cancalLoading();

        // 判断是否是最后一页（主要用于0页触发下拉）
        if(res.constructor === Array){
          if(res.length < this.data.pageSize && res.length > 0){
            this.setData({
              isLast:true
            })
          }
        }else if(res.data.constructor === Array){
          console.log(222)
          if(res.data.length < this.data.pageSize && res.length > 0){
            this.setData({
              isLast:true
            })
          }
        }

        // 判断是否为第一页
        if(!sec){
          this.setData({
            isPage0:false
          })
        }

        resolve(res)
      });
    },

    // 手指触摸开始
    touch1(e){
      if(this.data.isLast){
        this.setData({
          pageY:e.changedTouches[0].pageY
        })
      }

    },

    // 手指触摸结束
    touch2(e){
      if(this.data.isLast && this.data.isPage0){
        if(e.changedTouches[0].pageY - this.data.pageY > 50){
          this.toUpper();
        }
      }
    },




  }
})
