const {
    HttpException
} = require('../core/httpException');
const catchException = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.log(err.stack);
        if (err instanceof HttpException) {
            ctx.body = {
                msg: err.msg,
                errCode: err.errorCode,
                requestUrl: `${ctx.method} ${ctx.path}`,
                code: err.code
            };
        } else {
            ctx.body = {
                msg: `we made a mistake, O(∩_∩)O哈哈~`,
                errCode: err.errorCode,
                requestUrl: `${ctx.method} ${ctx.path}`,
                code: 500
            };
        }

    }
}

module.exports = catchException;