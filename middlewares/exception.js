const {
    HttpException
} = require('../core/httpException');
const config = require('../config/config.js');
const catchException = async (ctx, next) => {
    try {
        ctx.success = function (data, code = 0) {
            ctx.body = {
                code,
                data
            }
        }

        await next();
    } catch (err) {
        if (config.environment === 'dev') {
            console.log(err.stack);
        }
        if (err instanceof Error) {
            ctx.body = {
                msg: err.message,
                code: err.errorCode || -1,
                requestUrl: `${ctx.method} ${ctx.path}`,
            };

        } else {
            ctx.body = {
                msg: `we made a mistake, O(∩_∩)O哈哈~`,
                code: -1,
                requestUrl: `${ctx.method} ${ctx.path}`,
            };
            ctx.status = 500
        }


    }
}

module.exports = catchException;