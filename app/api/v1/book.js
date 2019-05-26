const Router = require("koa-router");
const router = new Router({
  prefix: "/v1/book"
});
router.post("/bookList", async (ctx, next) => {
  ctx.body = "book";
});

module.exports = router;