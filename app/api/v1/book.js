const Router = require("koa-router");
const router = new Router({
  prefix: "/v1/book"
});
const {
  ParameterException
} = require("../../../core/httpException");
// const {
//   PositiveIntegerValidator,
//   RegisterValidator
// } = require('../../validator/validator');
router.post("/bookList", async (ctx, next) => {
  let v = new RegisterValidator().validate(ctx);
  ctx.body = "book";
});

module.exports = router;