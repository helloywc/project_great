// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  switch(event.Content){
    case "1": await attention();break;
    case "media": await getMediaId();break;
    // case "3": await text();break;
    // case "4": await miniprogrampage();break;
    case "5": await link();break;
  }
  return 'success';
};

// 添加关注
async function attention() {
  const wxContext = cloud.getWXContext();
  let result = await db.collection('autoReply').get();
  let mediaId = result.data[0].mediaId
  await cloud.openapi.customerServiceMessage.send({
    touser: wxContext.OPENID,
    msgtype: 'image',
    image: {mediaId:mediaId}
  });
}

async function getMediaId() {
  const wxContext = cloud.getWXContext();
  let result = await db.collection('autoReply').get();
  let mediaId = JSON.stringify(result.data[0].mediaId)
  await cloud.openapi.customerServiceMessage.send({
    touser: wxContext.OPENID,
    msgtype: 'text',
    text: {
      content: `mediaId: ${mediaId}`
    }
  })
}

// 图文链接模板
async function link() {
  const wxContext = cloud.getWXContext();
  await cloud.openapi.customerServiceMessage.send({
    touser: wxContext.OPENID,
    msgtype: 'link',
    link: {
      title: '课程名称222',
      description: '课程描述',
      url: 'https://www.baidu.com',
      thumb_url: 'http:'    // 小图
    }
  });
}

// 文字
async function text() {
  const wxContext = cloud.getWXContext();
  await cloud.openapi.customerServiceMessage.send({
    touser: wxContext.OPENID,
    msgtype: 'text',
    text: {
      content: '课程名称222',
    }
  });
}

// 小程序
async function miniprogrampage() {
  const wxContext = cloud.getWXContext();
  let result = await db.collection('autoReply').get();
  let mediaId = result.data[0].mediaId
  await cloud.openapi.customerServiceMessage.send({
    touser: wxContext.OPENID,
    msgtype: 'miniprogrampage',
    miniprogrampage: {
      title: '课程名称222',
      pagepath: 'pages/course/course-index/course-index',
      thumb_media_id: mediaId,
      // https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/customer-message/customerServiceMessage.uploadTempMedia.html
    }
  });
}


