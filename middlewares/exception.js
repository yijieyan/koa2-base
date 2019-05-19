const catchException = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.log(err.stack);
        ctx.body = err.message;
    }
}

module.exports = catchException;