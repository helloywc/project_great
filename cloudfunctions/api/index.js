const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

exports.main = async (event, context) => {
  delete event.userInfo;
  switch (event.name) {
    case 'test1': { return await test1(event) }
    case 'createUserRecord': { return await createUserRecord(event) }
    case 'getUserInfoByUnionid': { return await getUserInfoByUnionid(event) }
    case 'updateUserInfoByUnionid': { return await updateUserInfoByUnionid(event) }
    case 'updateUserInfo': { return await updateUserInfo(event) }
    case 'getMediaId': { return await getMediaId(event) }
    case 'initMediaId': { return await initMediaId(event) }
    case 'addConsult': { return await addConsult(event) }
    case 'initActivity': { return await initActivity(event) }
    default: {return event.name + '没匹配上'}
    // case 'test1': { return 123123 }
  }
};
const fileID = 'cloud://dev-xiangshang.6465-dev-xiangshang-1300915274/autoReply/scan.jpg'


// 活动初始化
async function initActivity(params) {
  return new Promise((resolve, reject) => {
    delete params.name;
    db.collection('content').where({title:params.title}).get().then(res => {
      if(res.data.length === 0){
        db.collection('content').add({data:params}).then(res1 => {
          // return resolve(res)
          return resolve(success(res1))
        }).catch(err => {
          return reject(fail(err))
        })
      }else{
        return resolve(success(1))
      }
    }).catch(err => {return reject(fail(err))})
  })
}


// 新增咨询
async function addConsult(params) {
  delete params.name;
  return new Promise((resolve, reject) => {
    const wxContext = cloud.getWXContext()
    db.collection('user').where({unionid: wxContext.UNIONID}).get()
      .then(res =>{
        let data = res.data[0];
        delete data._id;
        data.time = params.time;
        data.remark = params.remark;
        db.collection('consult').add({data}).then(res1 => {
          return resolve(success(res1))
        }).catch(err => {
          console.log(err)
        })
        // return resolve(success1(res))
      })
      .catch(err => {return reject(fail(err))})
  })
}

// 获取 MediaId
async function getMediaId(params) {
  return new Promise((resolve, reject) => {
    db.collection('autoReply').get().then(res => {
      return resolve(success(res))
    }).catch(err => {return reject(fail(err))})
  })
}

// 初始化 MediaId
async function initMediaId(params) {
  let resfile = await cloud.downloadFile({fileID});
  return new Promise((resolve,reject) => {
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
            return resolve(success(res3))
          }).catch(err => {
            console.log(fail(err))
          })

        // 有数据
        }else{
          let _id = res2.data[0]._id;
          db.collection('autoReply').doc(_id).update({data:res1}).then(res3 => {
            return resolve(success(res3))
          }).catch(err => {
            console.log(fail(err))
          })
        }
      }).catch(err => {return reject(fail(err))})
    }).catch(err => {return reject(fail(err))})
  })
}

// 新增用户
async function createUserRecord(params) {
  return new Promise((resolve, reject) => {
    delete params.name;
    const wxContext = cloud.getWXContext()
    db.collection('user')
      .add({data: {
          openid:wxContext.OPENID,
          unionid:wxContext.UNIONID,
          ...params
        }})
      .then(res =>{return resolve(res)})
      .catch(err => {return reject(err)})
  })
}

// 获取用户
async function getUserInfoByUnionid(params) {
  return new Promise((resolve, reject) => {
    const wxContext = cloud.getWXContext()
    db.collection('user').where({unionid: wxContext.UNIONID}).get()
      .then(res =>{return resolve(success(res))})
      .catch(err => {return reject(fail(err))})
  })
}

// 更新用户部分数据
async function updateUserInfo(params) {
  return new Promise((resolve, reject) => {
    delete params.name;
    const wxContext = cloud.getWXContext()
    db.collection('user').where({unionid: wxContext.UNIONID})
      .update({data:{...params}})
      .then(res =>{return resolve(success(res))})
      .catch(err => {return reject(fail(err))})
  })
}


// 更新用户
async function updateUserInfoByUnionid(params) {
  const wxContext = cloud.getWXContext()
  return new Promise((resolve, reject) => {
    db.collection('user').where({unionid: params.unionid}).get()
      .then(res =>{
        if(res.data.length > 0){
          return resolve(res.data)
        }else{
          let data = {
            openid:wxContext.OPENID,
            unionid:wxContext.UNIONID,
            creatTime: new Date().getTime(),
            updateTime: new Date().getTime(),
            status: 1,
          }
          db.collection('user')
            .add({data: data})
            .then(res =>{return resolve([data])})
            .catch(err => {return reject(err)})
        }

      })
      .catch(err => {return reject(err)})
  })
}













// 添加指定用户到收藏
async function addFavourById(param) {
  return new Promise((resolve, reject) => {
    db.collection('customer')
      .where({_id: param.id})
      // .doc(param.id)
      .update({ data: { favour: _.push([param.openid])}})
      .then(res =>{return resolve(res)})
      .catch(err => {return reject(err)})
  })
}

// 移除指定用户到收藏
async function removeFavourById(param) {
  return new Promise((resolve, reject) => {
    db.collection('customer')
      .where({_id: param.id})
      .update({ data: { favour: param.favour}})
      .then(res =>{return resolve(res)})
      .catch(err => {return reject(err)})
  })
}

// 从专属中移除用户
async function removeSelfById(param) {
  return new Promise((resolve, reject) => {
    db.collection('customer')
      .where({_id: param.id})
      .update({ data: { self: null}})
      .then(res =>{return resolve(res)})
      .catch(err => {return reject(err)})
  })
}



// 添加指定用户到已拨打
async function addCalledById(param) {
  return new Promise((resolve, reject) => {
    db.collection('customer')
      .where({_id: param.id})
      .update({data: {status:2},})
      .then(res =>{return resolve(res)})
      .catch(err => {return reject(err)})
  })
}


// 用户星级评定
async function rankChoose(param) {
  return new Promise((resolve, reject) => {
    db.collection('customer')
      .where({_id: param.id})
      .update({data: {rank:param.rank},})
      .then(res =>{return resolve(res)})
      .catch(err => {return reject(err)})
  })
}

// 用户星级评定
async function addSelfById(param) {
  return new Promise((resolve, reject) => {
    db.collection('customer')
      .where({_id: param.id})
      .update({data: {self:param.openid}})
      .then(res =>{return resolve(res)})
      .catch(err => {return reject(err)})
  })
}

// 编辑备注
async function editRemark(param) {
  return new Promise((resolve, reject) => {
    db.collection('customer')
      .where({_id: param.id})
      .update({data: {remarks: param.text,userName:param.userName}})
      .then(res =>{return resolve(res)})
      .catch(err => {return reject(err)})
  })
}



// 编辑备注
async function editLabel(param) {
  return new Promise((resolve, reject) => {
    db.collection('customer')
      .where({_id: param.id})
      .update({data: {lable:param.value}})
      .then(res =>{return resolve(res)})
      .catch(err => {return reject(err)})
  })
}

// 创建新用户
async function createUser(param) {
  return new Promise((resolve, reject) => {
    db.collection('customer')
      .add({
        data:{
          code:"",
          // favour:[],
          lable:[],
          mobile:param.mobile,
          mobile2:"",
          projectName:param.projectName,
          province:param.province,
          qqNumber:"",
          rank:0,
          remarks:param.remarks,
          status:param.status,
          telephone:"",
          userName:param.userName,
          wechatNumber:"",
          self:param.self
        }
      })
      .then(res =>{return resolve(res)})
      .catch(err => {return reject(err)})
  })
}



async function test1(param) {
  return new Promise((resolve, reject) => {
    const _ = db.command
    const $ = db.command.aggregate

    db.collection('test')
      .where({_id:1})
      .get()
      .then(res =>{

        return resolve(b)
      })
      .catch(err => {return reject(err)})
  })
}

function success(res){
  if(res.data){
    return {
      code: 200,
      data: res.data,
      message: null
    }
  }else if(res.result){
    return {
      code: 200,
      data: res.result ,
      message: null
    }
  }else if(res.stats){
    return {
      code: 200,
      data: res.stats ,
      message: null
    }
  }else if(res.errMsg){
    return {
      code: 200,
      data: res.errMsg ,
      message: null
    }
  }else{
    return {
      code: 200,
      data: null ,
      message: null
    }
  }

}
function success1(res){
  if(res.data){
    return {
      code: 200,
      data: res.data[0],
      message: null
    }
  }
}

function fail(err){
  return {
    code: -1,
    data: null,
    message: err
  }
}
