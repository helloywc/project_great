const cloud = require('wx-server-sdk');
const fileID = 'cloud://dev-xiangshang.6465-dev-xiangshang-1300915274/autoReply/scan.jpg';
cloud.init();
const db = cloud.database();

// 云函数入口函数

exports.main = async (event, context) => {
  let resfile = await cloud.downloadFile({fileID});
  let buffer = resfile.fileContent;
  return cloud.openapi.customerServiceMessage.uploadTempMedia({
    type: 'image',
    media: {
      contentType: 'image/jpg',
      value: buffer
    }
  }).then(res1 => {
    db.collection('autoReply').get().then(res2 => {
      // 无数据
      if(res2.data.length === 0){
        db.collection('autoReply').add({data:res1}).then(res3 => {
          console.log(res3)
        }).catch(err => {
          console.log(err)
        })

        // 有数据
      }else{
        let _id = res2.data[0]._id;
        db.collection('autoReply').doc(_id).update({data:res1}).then(res3 => {
          console.log(res3)
        }).catch(err => {
          console.log(err)
        })
      }
    }).catch(err => {console.log(err)})
  }).catch(err => {console.log(err)})
}


