const Router = require("koa-router");
const auth = require('../../../middlewares/auth.js');
const router = new Router({
  prefix: "/v1/book"
});
router.get("/bookList", auth,async (ctx, next) => {
  ctx.body = {
    data:[1,2,3]
  };
});

module.exports = router;