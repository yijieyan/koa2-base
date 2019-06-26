const User = require('../model/user.js');
const { generateToken } = require('../../libs/token.js');
class UserCtrl {
  /**
   * @apiGroup User
   * @api {POST} /user/register 注册用户
   * @apiDescription 注册用户
   * @apiParam {String} [nickname]  昵称
   * @apiParam {String} email  邮箱
   * @apiParam {String} password  密码
   * @apiParam {String} repeatPassword 重复密码
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response:
   * {
   *    "code": 0,
   *    "data": {
   *        "msg": "注册成功"
   *    }
   * }
   */
  async register (ctx, next) {
    ctx.verifyParams({
      nickname: { type: 'string', required: false },
      email: { type: 'email' },
      password: { type: 'string', trim: true, min: 8, max: 32 },
      repeatPassword: { type: 'string', trim: true, min: 8, max: 32 }
    });
    let { nickname = '', email = '', password = '', repeatPassword = '' } = ctx.request.body;
    let user = '';
    // 01:账号登录   02:小程序登录
    if (!email || !password || !repeatPassword) {
      throw new Error('缺少参数');
    } else if (repeatPassword !== password) {
      throw new Error('2次输入的密码不一致');
    }
    user = await User.findOne({ email });

    if (!user) {
      await User.create({ nickname, email, password });
      return ctx.success({
        msg: '注册成功'
      });
    }
    ctx.success({
      msg: '账号已存在'
    }, -1);
  }
  /**
   * @apiGroup User
   * @api {POST} /user/login 用户登录
   * @apiDescription 用户登录
   * @apiParam {String} type  01:代表账号登录  02:小程序登录传openId
   * @apiParam {String} [email]  邮箱
   * @apiParam {String} [password]  密码
   * @apiParam {Number} [openId] 微信小程序的openId
   * @apiVersion 1.0.0
   * @apiSuccessExample {json} Success-Response:
   * {
   *      "code": 0,
   *      "data": {
   *          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTU2MTU1MTkzMCwiZXhwIjoxNTYxNjM4MzMwfQ.E99d2Br6hYXbeEpIvBwv1m7fLs-0Hzw8QuAQziq2CR0"
   *      }
   *   }
   */
  async login (ctx, next) {
    ctx.verifyParams({
      email: { type: 'string', required: false },
      password: { type: 'string', trim: true, min: 8, max: 32, required: false },
      openId: { type: 'string', required: false },
      type: { type: 'string' }
    });
    let { email = '', password = '', openId = '', type = '' } = ctx.request.body;
    // 01:账号登录   02:小程序登录
    try {
      let user = '';
      if (type === '01') {
        user = await User.verifyUser(email, password);
      } else if (type === '02') {
        user = await User.verifyUser('', password, openId);
      }
      if (user) {
        let token = await generateToken(user.id);
        ctx.success({ token });
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new UserCtrl();
