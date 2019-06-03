const Router = require('koa-router');
const Auth = require('../../../middlewares/auth.js');
const router = new Router({
  prefix: '/v1/book'
});
// 如果token解密出来的scope 小于当前接口 Auth 的参数9 就默认为当前用户无权限访问本接口
router.get('/bookList', new Auth(6).m, async (ctx, next) => {
  ctx.success({
    userId: ctx.userId,
    token: ctx.headers.token
  });
});

module.exports = router;
