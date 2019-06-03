const { appId, appSecret, url } = require('../../config/config.js').wx;
const http = require('../../libs/http.js');
class WxManager {
  constructor (code) {
    this.code = code;
  }

  async getOpenIdByCode () {
    let res = await http.get(`${url}/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`);
    if (res.errcode) {
      throw new Error('获取openId出错,code值:', res.errcode);
    }
  }
}

module.exports = WxManager;
