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

/**
 * 登录
 */
router.post('/login', async (ctx, next) => {
    try {
        // 100:账号密码登录  101:小程序登录  102：手机快速登录
        let {
            type,
            account,
            password
        } = ctx.request.body;
        if (+type === 100) {
            if (!account || !password) {
                throw new Error('缺少参数')
            }
            let user = await User.verifyUser(account, password)
            ctx.success(user);
        } else if (type === 101) {

        } else if (type === 102) {

        } else {
            throw new Error('非法登录')
        }
    } catch (err) {
        throw err;
    }
})
module.exports = router;