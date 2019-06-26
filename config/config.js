module.exports = {
  port: 3000,
  database: {
    dbName: 'island',
    username: 'root',
    password: '123456yan',
    host: '127.0.0.1',
    port: 3306
  },
  secretKey: '1212qeqeqeqeqe2112nvjkn23**&*^%%&*21',
  expiresIn: 60 * 60 * 24,
  wx: {
    appId: 'wx50a601e213ff1d1a',
    appSecret: '030a0c05e5c70e902fa0376339f6a9d4',
    url: 'https://api.weixin.qq.com'
  }
};
