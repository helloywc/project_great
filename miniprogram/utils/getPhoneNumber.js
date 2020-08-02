export  function getPhoneNumber(e,session_key){
  return new Promise((resolve,reject) => {
    wx.login({
      success(res){
        wx.cloud.callFunction({
          name: 'getPhoneNumber',
          data: {
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            sessionCode: res.code,
            session_key: session_key
          },
          success: res => {
            resolve(res.result.data)
          },
          fail: err => {
            reject(err)
          }
        })
      },
      fail(err){
        reject(err)
      }
    })
  })
}
