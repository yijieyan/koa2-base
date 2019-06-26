const Sequelize = require('sequelize');
const bcryptjs = require('bcryptjs');
const {
  sequelize
} = require('../../libs/db.js');
class User extends Sequelize.Model {
  static async verifyUser (email = '', password = '', openId = '') {
    let user = '';
    if (email) {
      user = await User.findOne({
        where: {
          email
        }
      });
    } else if (openId) {
      user = await User.findOne({
        where: {
          openid: openId
        }
      });
    }

    if (!user) {
      throw new Error(`账户不存在`);
    } else {
      let isExist = bcryptjs.compareSync(password, user.password);
      if (!isExist) {
        throw new Error('密码不正确');
      }
      return user;
    }
  }
}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    set (val) {
      let salt = bcryptjs.genSaltSync(10);
      let pwd = bcryptjs.hashSync(val, salt);
      this.setDataValue('password', pwd);
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize,
  tableName: 'user'
});

module.exports = User;
