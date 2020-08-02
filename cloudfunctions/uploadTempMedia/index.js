// // 云函数入口文件
//
// const cloud = require('wx-server-sdk')
// const requestpromise = require('request-promise');
//
//
// cloud.init()
//
// // 云函数入口函数
//
// exports.main = async (event, context) => {
//   let a = cloud.openapi.customerServiceMessage.uploadTempMedia({
//     type: 'image',
//     media: {
//       contentType: 'image/png',
//       value: 'https://6465-dev-xiangshang-1300915274.tcb.qcloud.la/autoReply/autoReply_qrCode.png?sign=a3f5b53ded3a6345152651600a59b62e&t=1577255921'
//     }
//   })
//   return a
// }



const cloud = require('wx-server-sdk')
const fileID = 'cloud://dev-xiangshang.6465-dev-xiangshang-1300915274/autoReply/scan.jpg'
cloud.init()

// 云函数入口函数

exports.main = async (event, context) => {
  var resfile = await cloud.downloadFile({
    fileID,
  })
  var buffer = resfile.fileContent
  return cloud.openapi.customerServiceMessage.uploadTempMedia({
    type: 'image',
    media: {
      contentType: 'image/jpg',
      value: buffer
    }
  }).then((res) => {
    console.log('success', res);
  }).catch((error) => {
    console.log('error', error)

  })

}
