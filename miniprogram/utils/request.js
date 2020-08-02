export function request(obj) {
  let promise = new Promise((resolve, reject) => {

    switch(obj.type){

      case "cloudDb":     // 云数据库
        obj.cloud().then( res =>{
          resolve(res)
        }).catch(err =>{
          reject(err)
        });
        break;

      case "cloudFn":     // 云函数
        wx.cloud.callFunction({
          name: obj.doc, data: {name:obj.name,...obj.data},
          success: res => {
            if(res.result.code === 200){
              resolve(res.result)
            }else if(res.code === 200){
              resolve(res.result)
            }

            // resolve(res)
          },
          fail: err => {
            reject(err.errMsg)
          }
        });
        break;

      case "server":      // 服务器
        wx.request({
          header: {
            // 'Content-Type': 'application/json',
            // Authorization: tokenres.data,
          },
          ...obj,
          success: res => {
            //服务器返回数据
            if (res.statusCode == 200 || res.statusCode == 201) {
              resolve(res.data);
            } else {
              reject(res);
            }
          },
          fail: error => {
            reject(error);
          },
        });
        break;
    }
  });
  return promise;
}


