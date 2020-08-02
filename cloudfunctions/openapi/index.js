// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()


// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  switch (event.action) {
    case 'sendTemplateMessage': {
      return sendTemplateMessage(event)
    }
  }
};

async function sendTemplateMessage(event) {
  const {OPENID} = cloud.getWXContext()

  const sendResult = await cloud.openapi.templateMessage.send({
    access_token: event.session_key,
    touser: OPENID,
    template_id: 'kAdjid8JAJqHKzkamHagI7NWd6oGGCrkaVqUQY9fJUM',
    form_id: event.formId,
    page: 'page/course/course-index/course-index',
    data: {
      keyword1: {
        value: '未名咖啡屋',
      },
      keyword2: {
        value: '2019 年 1 月 1 日',
      },
      keyword3: {
        value: '拿铁',
      },
    }
  })

  return sendResult

  // const sendResult2 = {
  //   access_token: event.session_key,
  //   touser: OPENID,
  //   template_id: '0ViI_X3JdzmZWqDqz0iJJgk72PxkJybHU_4SLO-HH8o',
  //   form_id: event.formId,
  //   page: 'page/course/course-index/course-index',
  //   data: {
  //     keyword1: {
  //       value: '未名咖啡屋',
  //     },
  //     keyword2: {
  //       value: '2019 年 1 月 1 日',
  //     },
  //     keyword3: {
  //       value: '拿铁',
  //     },
  //   }
  // }
  //
  //
  // return sendResult2
}

