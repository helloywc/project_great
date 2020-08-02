// 云函数入口文件

const cloud = require('wx-server-sdk')
const requestpromise = require('request-promise');
var WXBizDataCrypt = require('./RdWXBizDataCrypt') // 用于手机号解密
cloud.init()

// 云函数入口函数

exports.main = async (event, context) => {
  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
  const appid = "wxfb6003dc4f43cebe"
  const pc = new WXBizDataCrypt(appid, event.session_key)  // -解密第一步
  const data = pc.decryptData(event.encryptedData, event.iv)   // 解密第二步
  return { data }
}
