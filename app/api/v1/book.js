const router = require('koa-router')();
const {
    ParameterException
} = require('../../../core/httpException');
router.get('/v1/book', async (ctx, next) => {
    let error = new ParameterException();
    throw error;
    ctx.body = 'book';
})

module.exports = router;