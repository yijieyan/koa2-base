const Router = require('koa-router');
const User = require('../../model/user');

const router = new Router({
    prefix: '/v1/user'
});


/**
 * 用户注册
 */
router.post('/register', async (ctx, next) => {
    try {
        let {
            nickname,
            email,
            password1,
            password2,
            openid
        } = ctx.request.body;
        if (!email || !password1 || !password2 || !openid) {
            throw new Error('缺少参数');
        } else if (password1 !== password2) {
            throw new Error('2次输入的密码不相同');
        } else {
            let user = await User.findOne({
                where: {
                    openid
                }
            })
            if (!user) {
                await User.create({
                    nickname,
                    email,
                    password: password1,
                    openid
                })
            }

            ctx.success(`successful`);
        }

    } catch (err) {
        throw err;
    }
});

module.exports = router;