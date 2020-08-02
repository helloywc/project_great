// 云函数入口文件

const cloud = require('wx-server-sdk')
const requestpromise = require('request-promise');


cloud.init()

// 云函数入口函数

exports.main = async (event, context) => {

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
  // const wxContext = cloud.getWXContext()
  // const appid = wxContext.APPID
  const AccessToken_options = {

    method: 'GET',
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    qs: {
      appid:"wxfb6003dc4f43cebe",
      secret:'50e2b2a47e7236884e45df19df3e16c6',  // 微信开发后台可生成，唯有微信认证过的国内主体才可有
      grant_type: 'authorization_code',
      js_code: event.js_code // 小程序中获取过来的
    },
      json: true
    };
  const resultValue = await requestpromise (AccessToken_options);
  return { ...resultValue }
}
