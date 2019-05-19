const router = require('koa-router')();

router.get('/v1/book', async (ctx, next) => {
    throw new Error('i am wrong');
    ctx.body = 'book';
})

module.exports = router;