const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config.js');

class HttpAuth {
  constructor (level) {
    this.level = level || 1; // 当前访问接口需要的权限
    HttpAuth.USER = 8; // 普通用户 默认是8
    HttpAuth.ADMIN = 16; // 管理员默认是16  , 中间保留数字为具体的项目增加权限留下空间
  }

  get m () {
    return async (ctx, next) => {
      try {
        const token = ctx.headers.token;
        if (!token) {
          throw new Error('token是必传项');
        }
        let tokenInfo = await jwt.verify(token, secretKey);
        ctx.userId = tokenInfo.userId;
        if (tokenInfo.scope < this.level) {
          throw new Error('权限不足');
        }
      } catch (err) {
        if (err.name == 'TokenExpiredError') {
          throw new Error('token 已过期');
        } else if (err.name === 'JsonWebTokenError') {
          throw new Error('token 不合法');
        } else {
          throw err;
        }
      }
      await next();
    };
  }
}
module.exports = HttpAuth;
