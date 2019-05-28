const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config.js');

class HttpAuth {
  constructor() {
   
  }

  get m() {
    return async (ctx,next) => {
       try {
         const token = ctx.headers.token;
         if (!token) {
          throw new Error('token是必传项');
         }
        let tokenInfo = await jwt.verify(token,secretKey);
         ctx.userId = tokenInfo.userId;
       } catch(err) {
         if (err.name == 'TokenExpiredError') {
          throw new Error('token 已过期')
         } else if(err.name === 'JsonWebTokenError') {
          throw new Error('token 不合法')
         } else {
             throw err;
         }
       }
       await next();
    }
  }
}
module.exports = new HttpAuth().m;