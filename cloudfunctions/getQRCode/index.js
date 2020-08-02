const secret = '50e2b2a47e7236884e45df19df3e16c6'
const rp = require('request-promise')

exports.main = async (event, context) => {
  let opt = {
    method: 'GET',
    url: 'https://api.weixin.qq.com/cgi-bin/token',
    qs: {
      appid: event.userInfo.appId,
      secret,
      grant_type: 'client_credential'
    },
    json: true
  }

  let res = await rp(opt)
  opt = {
    method: 'POST',
    url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + res.access_token,
    body: {
      'page': event.page,
      'width': event.width,
      'scene': event.scene
    },
    json: true,
    encoding: null
  }
  return await rp(opt)
}
