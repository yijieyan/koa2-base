const Sequelize = require('sequelize');
const bcryptjs = require('bcryptjs');
const {
  sequelize
} = require('../../core/db.js');
class User extends Sequelize.Model {
  static async verifyUser(account, password) {
    let user = await User.findOne({
      where: {
        email: account
      }
    })
    if (!user) {
      throw new Error(`不存在账户: ${account}`)
    } else {
      let isExist = bcryptjs.compareSync(password, user.password);
      if (!isExist) {
        throw new Error('密码不正确')
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
    set(val) {
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
})

module.exports = User;