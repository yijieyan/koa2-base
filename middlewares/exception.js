const catchException = async (ctx, next) => {
  try {
    ctx.success = function (data, code = 0) {
      ctx.body = {
        code,
        data
      };
    };

    await next();
  } catch (err) {
    if (process.NODE_ENV === 'development') {
      console.log(err.stack);
    }
    if (err instanceof Error) {
      ctx.body = {
        msg: err.errors || err.message,
        code: err.errorCode || -1,
        requestUrl: `${ctx.method} ${ctx.path}`
      };
    } else {
      ctx.body = {
        msg: `we made a mistake, O(∩_∩)O哈哈~`,
        code: -1,
        requestUrl: `${ctx.method} ${ctx.path}`
      };
      ctx.status = 500;
    }
  }
};

module.exports = catchException;
