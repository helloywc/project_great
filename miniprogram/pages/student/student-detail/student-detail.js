Page({
  data: {
    showSharePic: false,   //分享海报显示隐藏
    sharePicUrl: '',       //生成海报链接
    logoUrl: 'https://6465-dev-xiangshang-1300915274.tcb.qcloud.la/share/10.jpg?sign=ba5abc7e7e6c5ea110ecb4638f7771cf&t=1577933870',        //分享图
    headIcon: 'https://6465-dev-xiangshang-1300915274.tcb.qcloud.la/share/bg.gif?sign=87a1d5d660c247d75ac2d9ea56e2894e&t=1577933562',  //头像
    codeLogo: 'https://6465-dev-xiangshang-1300915274.tcb.qcloud.la/share/qr_code.jpg?sign=7b882a58d95d512417d323c2b0ff80cb&t=1577933460',  //小程序码
  },


  //显示/生成分享海报
  showPic() {

    let sharePicUrl = this.data.sharePicUrl;

    if (sharePicUrl != '') {//如果已经生成过一次直接显示
      this.setData({
        showSharePic: true
      })
    } else {
      wx.showToast({
        title: '图片生成中',
        mask: true,
        icon: 'loading',
        duration: 100000
      });

      this.setData({share: false});


      Promise.all([
        this.getPicture(this.data.logoUrl),
        this.getPicture(this.data.headIcon),
        this.getPicture(this.data.codeLogo),
      ]).then(res => {
        this.drawImg(res[0],res[1],res[2])
      }).catch(err => {
        console.log(err)
      })

    }
  },

  getPicture(url){
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: url,
        success: res => {
          wx.getImageInfo({
            src: res.tempFilePath,
            success (res2) {
              res.width = res2.width;
              res.height = res2.height;
              // resolve(res.tempFilePath)
              resolve(res)
            }
          })

        }
      })
    })
  },


  //关闭分享海报
  closeShare() {
    this.setData({
      showSharePic: false
    })
  },

  //绘图
  drawImg(logoObj, headIconObj, codeObj) {
    let logo = logoObj.tempFilePath;
    let headIcon = headIconObj.tempFilePath;
    let code = codeObj.tempFilePath;

    let title = '腾讯首家线上社区上线啦';//帖子标题
    let authorName = 'var 友原'; //用户昵称

    let w = 0;
    wx.getSystemInfo({
      success: function (res) {
        w = res.screenWidth;
      },
    })

    let ctx = wx.createCanvasContext('shareFrends');

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w / 750 * 670 * 2, w / 750 * 744 * 2);

    if (title.length > 17) {
      title = title.slice(0, 17) + '...';
    }

    //绘制logo
    ctx.drawImage(logo, 0, 0, w / 750 * 670 * 2, w / 750 * 380 * 2, 0, 0)

    //绘制标题
    ctx.setFontSize(w / 750 * 34 * 2)
    ctx.setFillStyle('#333333')//文字颜色
    ctx.fillText(title, w / 750 * 32 * 2, w / 750 * 430 * 2)


    //绘制头像、昵称
    ctx.save()//保存当前的绘图上下文。
    ctx.beginPath()//开始创建一个路径
    //画一个圆形裁剪区域
    ctx.arc(w / 750 * 52 * 2, w / 750 * 486 * 2, w / 750 * 20 * 2, 0, 2 * Math.PI, false)
    ctx.clip()//裁剪

    //绘制图片
    ctx.drawImage(headIcon, w / 750 * 32 * 2, w / 750 * 466 * 2, w / 750 * 40 * 2, w / 750 * 40 * 2)
    ctx.restore()//恢复之前保存的绘图上下文

    ctx.setFontSize(w / 750 * 24 * 2)
    ctx.setFillStyle('#333333');
    //绘制文本
    ctx.fillText(authorName, w / 750 * 82 * 2, w / 750 * 495 * 2)

    //绘制线条
    ctx.moveTo(w / 750 * 32 * 2, w / 750 * 539 * 2);
    ctx.lineTo(w / 750 * 638 * 2, w / 750 * 539 * 2);
    ctx.setLineWidth = 1;
    ctx.setStrokeStyle('#eeeeee')
    ctx.stroke();

    //绘制左下文案
    ctx.setFontSize(w / 750 * 28 * 2)
    ctx.setFillStyle('#333333');
    //绘制文本
    ctx.fillText('性感官方，在线解答', w / 750 * 32 * 2, w / 750 * 593 * 2)

    ctx.setFontSize(w / 750 * 22 * 2)
    ctx.setFillStyle('#aaaaaa');
    //绘制文本
    ctx.fillText('答疑，解惑，反馈，应有尽有', w / 750 * 32 * 2, w / 750 * 638 * 2)

    ctx.setFontSize(w / 750 * 22 * 2)
    ctx.setFillStyle('#aaaaaa');
    //绘制文本
    ctx.fillText('陪您嗨翻天！', w / 750 * 32 * 2, w / 750 * 672 * 2)

    //绘制二维码
    ctx.drawImage(code, w / 750 * 518 * 2, w / 750 * 564 * 2, w / 750 * 120 * 2, w / 750 * 120 * 2);
    ctx.setFontSize(w / 750 * 20 * 2)
    ctx.setFillStyle('#aaaaaa');
    //绘制文本
    ctx.fillText('长按扫码查看', w / 750 * 518 * 2, w / 750 * 705 * 2)

    ctx.draw(false, () => {
        //调用接口将画布转换为图片
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          fileType: 'jpg',
          quality: 1,
          width: w / 750 * 670 * 2,
          height: w / 750 * 744 * 2,
          destWidth: w / 750 * 670 * 2,
          destHeight: w / 750 * 744 * 2,
          canvasId: 'shareFrends',
          success: res => {

            wx.hideToast();

            this.setData({
              sharePicUrl: res.tempFilePath   //生成的图片路径
            }, () => {

              //渲染完后再显示分享海报
              this.setData({
                share: false,
                showSharePic: true
              })

            })
          },
          fail(err) {
            wx.showToast({
              title: '图片生成失败，请稍候再试！',
              icon: 'none',
              mask: true
            })
          }
        })
      }
    );

  },

  //保存图片
  savePic() {
    let sharePicUrl = this.data.sharePicUrl;

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.writePhotosAlbum'] == false) {
          wx.showModal({
            title: '提示',
            content: '是否授权将相册保存到相册？',
            confirmColor: '#2ca2ed',
            success: res => {
              //点击确定打开授权设置
              if (res.confirm) {

                wx.openSetting({
                  success: res => {

                    setTimeout(() => {
                      if (res.authSetting['scope.writePhotosAlbum'] == true) {

                        wx.saveImageToPhotosAlbum({
                          filePath: sharePicUrl,
                          success: res => {
                            this.closeShare();
                            wx.showToast({
                              title: '保存成功！',
                              icon: 'success',
                              mask: true
                            })
                          },
                          fail: err => {
                            wx.showToast({
                              title: '保存失败！',
                              icon: 'none',
                              mask: true
                            })
                          }
                        })

                      } else {
                        wx.showToast({
                          title: '保存失败！',
                          icon: 'none',
                          mask: true
                        })
                      }
                    }, 500)

                  }
                })

              }

            }
          })
        } else {

          wx.saveImageToPhotosAlbum({
            filePath: sharePicUrl,
            success: res => {
              this.closeShare();
              wx.showToast({
                title: '保存成功！',
                icon: 'success',
                mask: true
              })
            }
          })

        }
      }
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }
})
