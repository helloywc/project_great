/**
 * 小程序配置文件
 */
// 生产环境 prod    测试环境 test    开发环境 dev    连本机 local
const env = 'test';
let baseUrl;
let ip;

switch (env) {

  case 'dev':     // 开发环境外部地址
    ip = '';
    baseUrl = `https://${ip}/power-charge-manage/`;
    break;

  case 'prod':
    ip = '';
    baseUrl = `https://${ip}/power-charge-manage/`;
    break;

}
const config = {
  env,
  baseUrl,
  ip,
  payCallbackUrl: 'api/wx/pay/notify', // 支付回调地址
  subKey: 'TNNBZ-WKHW4-A5DUH-XOLQP-AOP5T-EFBO7',
};

module.exports = config;
