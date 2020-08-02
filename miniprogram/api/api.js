import { request } from '../utils/request';
import config from '../config';
const db = wx.cloud.database();
const _ = db.command

// data: {
//   // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
//   description: "learn cloud database",
//     due: new Date("2018-09-01"),
//     tags: [
//     "cloud",
//     "database"
//   ],
//     // 为待办事项添加一个地理位置（113°E，23°N）
//     location: new db.Geo.Point(113, 23),
//     done: false
// },

// 活动初始化
export function initActivity(params) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: params,
    type:'cloudFn',doc:'api',name:'initActivity',
    cloud:() => {}
  }).then(function(res) {
    return res;
  });
}

// 新增咨询客户
export function addConsult(params) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: params,
    type:'cloudFn',doc:'api',name:'addConsult',
    cloud:() => {}
  }).then(function(res) {
    return res;
  });
}

// 初始化mediaId
export function initMediaId(params) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: params,
    type:'cloudFn',doc:'api',name:'initMediaId',
    cloud:() => {}
  }).then(function(res) {
    return res;
  });
}

// 获取mediaId
export function getMediaId(params) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: params,
    type:'cloudFn',doc:'api',name:'getMediaId',
    cloud:() => {}
  }).then(function(res) {
    return res;
  });
}

// 新增用户
export function createUserRecord(params) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: params,
    type:'cloudFn',doc:'api',name:'createUserRecord',
    cloud:() => {}
  }).then(function(res) {
    return res;
  });
}

// 新增用户
export function getUserInfoByUnionid(params) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: params,
    type:'cloudFn',doc:'api',name:'getUserInfoByUnionid',
    cloud:() => {}
  }).then(function(res) {
    return res;
  });
}

// 更新用户
export function updateUserInfoByUnionid(params) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: params,
    type:'cloudFn',doc:'api',name:'updateUserInfoByUnionid',
    cloud:() => {}
  }).then(function(res) {
    return res;
  });
}


// 更新用户信息
export function updateUserInfo(params) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: params,
    type:'cloudFn',doc:'api',name:'updateUserInfo',
    cloud:() => {}
  }).then(function(res) {
    return res;
  });
}

// 获取项目名
export function getProjectList(params) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: params,
    type:'cloudDb',doc:'api-uua',name:'getProjectList',
    cloud:() => {
      return new Promise((resolve,reject) =>{
        db.collection('project').where({status:1}).get().then(res =>{
          return resolve(res)
        })
      })
    }
  }).then(function(res) {
    return res;
  });
}

// 获取用户列表
export function getUserList(params) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: params,
    type:'cloudDb',doc:'api-uua',name:'getProjectList',
    cloud:() => {
      return new Promise((resolve,reject) =>{

        // console.log('params',params)

        let newParam = JSON.parse(JSON.stringify(params));
        let favour = [];
        favour.push(newParam.favour);
        let self = params.self;

        delete newParam.page;
        delete newParam.size;
        delete newParam.favour;
        delete newParam.self;

        // console.log('newParam',newParam)

        // 专属
        if(params.self){
          db.collection('customer')
            .where({
              ...newParam,
              self:self
            })
            .skip(params.page * params.size)
            .limit(params.size)
            .get().then(res =>{
            return resolve(res)
          })

          // 收藏
        }else if(params.favour){
          db.collection('customer')
            .where({
              ...newParam,
              favour:_.in(favour)
            })
            .skip(params.page * params.size)
            .limit(params.size)
            .get().then(res =>{
            return resolve(res)
          })

          // 普通
        }else{
          db.collection('customer')
            .where({
              ...newParam,
              self:null
            })
            .skip(params.page * params.size)
            .limit(params.size)
            .get().then(res =>{
            return resolve(res)
          })
        }

      })
    }
  }).then(function(res) {
    return res;
  });
}

// 获取用户列表记录数
export function getUserListCount(params) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: params,
    type:'cloudDb',doc:'api',name:'getUserByName',
    cloud:() => {
      return new Promise((resolve,reject) =>{

        // console.log('params',params)

        let newParam = JSON.parse(JSON.stringify(params));
        let favour = [];
        favour.push(newParam.favour);
        let self = params.self;

        delete newParam.page;
        delete newParam.size;
        delete newParam.favour;
        delete newParam.self;

        // console.log('newParam',newParam)

        // 专属
        if(params.self){
          db.collection('customer')
            .where({
              ...newParam,
              self:self
            })
            .count().then(res =>{
            return resolve(res)
          })

          // 收藏
        }else if(params.favour){
          db.collection('customer')
            .where({
              ...newParam,
              favour:_.in(favour)
            })
            .count().then(res =>{
            return resolve(res)
          })

          // 普通
        }else{
          db.collection('customer')
            .where({
              ...newParam,
              self:null
            })
            .count().then(res =>{
            return resolve(res)
          })
        }

      })
    }
  }).then(function(res) {
    return res;
  });
}

// 获取用户名
export function getUserByName(params) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: params,
    type:'cloudDb',doc:'api',name:'getUserByName',
    cloud:() => {
      return new Promise((resolve,reject) =>{
        db.collection('customer')
          .where({userName:params.userName})
          // .where({userName:/params.userName/i})
          .limit(1000)
          .get().then(res =>{
          return resolve(res)
        })

      })
    }
  }).then(function(res) {
    return res;
  });
}



// 删除指定用户
export function deleteUserById(param) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: param,
    type:'cloudFn',doc:'api',name:'deleteUserById',
    cloud:() => {
      return new Promise((resolve, reject) => {
        db.collection('customer')
          .where({_id: param.id})
          .update({data: {status:0},})
          .then(res =>{return resolve(res)})
          .catch(err => {return reject(err)})
      })
    }
  }).then(function(res) {
    return res;
  });
}


// 添加用户到收藏
export function addFavourById(param) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: param,
    type:'cloudFn',doc:'api',name:'addFavourById',
  }).then(function(res) {
    return res;
  });
}

// 添加用户到收藏
export function removeFavourById(param) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: param,
    type:'cloudFn',doc:'api',name:'removeFavourById',
  }).then(function(res) {
    return res;
  });
}

// 添加用户到专属
export function addSelfById(param) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: param,
    type:'cloudFn',doc:'api',name:'addSelfById',
  }).then(function(res) {
    return res;
  });
}

// 专属中移除用户
export function removeSelfById(param) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: param,
    type:'cloudFn',doc:'api',name:'removeSelfById',
  }).then(function(res) {
    return res;
  });
}


// 添加指定用户到已拨打
export function addCalledById(param) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: param,
    type:'cloudFn',doc:'api',name:'addCalledById',
  }).then(function(res) {
    return res;
  });
}

// 用户星级评定
export function rankChoose(param) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: param,
    type:'cloudFn',doc:'api',name:'rankChoose',
  }).then(function(res) {
    return res;
  });
}

// 编辑备注
export function editRemark(param) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: param,
    type:'cloudFn',doc:'api',name:'editRemark',
  }).then(function(res) {
    return res;
  });
}


// test1
export function test1(param) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: param,
    type:'cloudFn',doc:'api',name:'test1',
  }).then(function(res) {
    return res;
  });
}

// 编辑用户标签
export function editLabel(param) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: param,
    type:'cloudFn',doc:'api',name:'editLabel',
  }).then(function(res) {
    return res;
  });
}

// 根据ID获取用户
export function getUserById(param) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: param,
    type:'cloudDb',doc:'api',name:'getUserById',
    cloud:() => {
      return new Promise((resolve, reject) => {
        db.collection('customer')
          .where({_id: param.id})
          .get()
          .then(res =>{return resolve(res)})
          .catch(err => {return reject(err)})
      })
    }
  }).then(function(res) {
    return res;
  });
}

// 创建新用户
export function createUser(param) {
  return request({
    url: config.baseUrl + '/api/wx/encryptedData', method: 'GET', data: param,
    type:'cloudFn',doc:'api',name:'createUser',
  }).then(function(res) {
    return res;
  });
}
